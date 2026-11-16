import cluster, { Worker } from "cluster";
import { SpvOptions } from "./spv";
import DbNodes from "./db_nodes";
import DbBlocks from "./db_blocks";
import * as Helpers from "./helpers";
import Net from "net";
import path from "path";
import { assertSupportedTicker, SupportedTicker } from "./tickers";

export type WorkerType = "block" | "mempool";
type ManagedWorker = Worker & {
  spvType?: WorkerType;
  spvNode?: string;
  spvKey?: string;
};

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Master Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Master Uncaught Exception thrown");
  process.exit(1);
});

export interface MasterOptions {
  ticker: SupportedTicker;
  nodes: string[];
  seedNodesOnly?: boolean;
  enableIpv6?: boolean;
  mempool: number;
  blocks: number;
  validate?: boolean;
  forceUserAgent?: string;
  user_agent?: string;
  magic?: string;
  genesisHeader?: string;
  version?: number;
  invalidBlocks?: string[];
  dataDir: string;
  pruneBlocks: number;
  blockHeight: number;
  /** First cooldown applied to a host after it fails to connect. */
  nodeBackoffBase?: number;
  /** Ceiling for the per-host exponential cooldown. */
  nodeBackoffMax?: number;
  /** A connection held at least this long resets the host's failure streak. */
  nodeStableTime?: number;
  DEBUG_LOG?: boolean;
  DEBUG_MEMORY?: boolean;
}

export default class Master {
  sockets: { [key: string]: Net.Socket };
  mempool_sockets: { [key: string]: Net.Socket };
  workers: { [key: string]: Worker };
  server?: Net.Server;
  db_nodes: DbNodes;
  workerConfig: SpvOptions;
  queue_block_nodes: string[];
  queue_mempool_nodes: string[];
  block_nodes: Set<string>;
  mempool_nodes: Set<string>;
  seed_nodes: string[];
  mempool: number;
  blocks: number;
  seedNodesOnly: boolean;
  nodeBackoffBase: number;
  nodeBackoffMax: number;
  nodeStableTime: number;
  shuttingDown: boolean;
  memoryInterval?: NodeJS.Timeout;

  constructor({
    ticker,
    nodes,
    seedNodesOnly = false,
    enableIpv6 = false,
    forceUserAgent,
    user_agent,
    magic,
    genesisHeader,
    version,
    invalidBlocks,
    dataDir,
    pruneBlocks,
    blockHeight,
    mempool = 0,
    blocks = 0,
    validate,
    nodeBackoffBase = 1000 * 10, // 10 seconds
    nodeBackoffMax = 1000 * 60 * 10, // 10 minutes
    nodeStableTime = 1000 * 60, // 1 minute
    DEBUG_LOG,
    DEBUG_MEMORY,
  }: MasterOptions) {
    this.sockets = {};
    this.mempool_sockets = {};
    this.workers = {};
    this.shuttingDown = false;
    this.nodeBackoffBase = nodeBackoffBase;
    this.nodeBackoffMax = Math.max(nodeBackoffBase, nodeBackoffMax);
    this.nodeStableTime = nodeStableTime;
    process.once("SIGINT", () => this.shutdown("SIGINT"));
    process.once("SIGTERM", () => this.shutdown("SIGTERM"));

    assertSupportedTicker(ticker);
    const nodesDir = path.join(dataDir, ticker, "nodes");
    this.db_nodes = new DbNodes({ nodesDir, enableIpv6, readOnly: false });
    this.seed_nodes = nodes;
    this.mempool = mempool;
    this.blocks = blocks;
    this.seedNodesOnly = seedNodesOnly;
    this.queue_block_nodes = [];
    this.queue_mempool_nodes = [];
    this.block_nodes = new Set();
    this.mempool_nodes = new Set();

    if (!nodes || nodes.length === 0) throw Error(`Missing nodes array`);
    if (!blocks && !mempool)
      throw Error(`Must set blocks > 0 and/or mempool > 0`);

    const blocksDir = path.join(dataDir, ticker, "blocks");
    const db_blocks = new DbBlocks({ blocksDir, readOnly: false });
    db_blocks.syncDb().then(() => db_blocks.close());
    this.db_nodes.saveSeenNodes(nodes);

    const workerConfig: SpvOptions = {
      ticker,
      node: "",
      forceUserAgent,
      user_agent,
      magic,
      genesisHeader,
      version,
      invalidBlocks,
      dataDir,
      pruneBlocks,
      blockHeight,
      validate,
      // The master owns node selection, so workers must not retry a dead host
      // on their own. Every failure is reported back here, which applies the
      // per-host cooldown before handing out another node.
      autoReconnect: false,
      DEBUG_LOG,
      DEBUG_MEMORY,
    };
    this.workerConfig = workerConfig;

    cluster.on("exit", (worker, code, signal) => {
      this.onWorkerExit(worker as ManagedWorker, code, signal);
    });

    for (let i = 0; i < blocks; i++) {
      this.forkWorker("block");
    }

    for (let i = 0; i < mempool; i++) {
      this.forkWorker("mempool");
    }

    if (DEBUG_MEMORY) {
      this.memoryInterval = setInterval(() => {
        const m: any = process.memoryUsage();
        console.log(
          `master: Memory: ${Object.keys(m)
            .map((key: string) => `${key}: ${Helpers.formatBytes(m[key])}`)
            .join(", ")}`
        );
      }, 1000 * 60);
    }
  }

  private workerKey(type: WorkerType, node: string) {
    return `${type === "block" ? "blocks" : "mempool"}-${node}`;
  }

  private unregisterWorker(worker: ManagedWorker) {
    if (worker.spvKey && this.workers[worker.spvKey] === worker) {
      delete this.workers[worker.spvKey];
    } else {
      for (const key in this.workers) {
        if (this.workers[key] === worker) delete this.workers[key];
      }
    }
    worker.spvKey = undefined;
  }

  private registerWorker(worker: ManagedWorker, type: WorkerType, node: string) {
    this.unregisterWorker(worker);
    const key = this.workerKey(type, node);
    worker.spvType = type;
    worker.spvNode = node;
    worker.spvKey = key;
    this.workers[key] = worker;
  }

  private onWorkerExit(
    worker: ManagedWorker,
    code: number | null,
    signal: string | null
  ) {
    const { spvType: type, spvNode: node } = worker;
    console.error(
      `master: Worker ${worker.id} exited with code: ${code}, signal: ${signal}`
    );
    this.unregisterWorker(worker);
    if (type === "block") {
      if (node) this.block_nodes.delete(node);
      if (!this.shuttingDown && !worker.exitedAfterDisconnect)
        this.forkWorker("block");
    } else if (type === "mempool") {
      if (node) this.mempool_nodes.delete(node);
      if (!this.shuttingDown && !worker.exitedAfterDisconnect)
        this.forkWorker("mempool");
    }
  }

  private recordNodeFailure(node: string) {
    if (!node) return;
    try {
      this.db_nodes.recordFailure({ node }, { stableTime: this.nodeStableTime });
    } catch (err) {}
  }

  private isCoolingDown(node: string) {
    return (
      this.db_nodes.getBackoffRemaining(
        { node },
        { base: this.nodeBackoffBase, max: this.nodeBackoffMax }
      ) > 0
    );
  }

  private forkWorker(type: WorkerType) {
    const label = type === "block" ? "blocks" : "mempool";
    const activeNodes =
      type === "block" ? this.block_nodes : this.mempool_nodes;
    const selection = this.getNextNode(type);
    let node = selection.node;
    const waitMs = selection.waitMs;
    const worker = cluster.fork() as ManagedWorker;
    activeNodes.add(node);
    this.registerWorker(worker, type, node);

    worker.on("message", async (data) => {
      if (typeof data !== "string") return;
      let obj: any;
      try {
        obj = JSON.parse(data);
      } catch (err) {
        return;
      }
      const { command } = obj;
      if (type === "mempool" && command === "mempool_tx") {
        return this.onMempoolTxMessage(data);
      } else if (command === "connected") {
        // Marks the host as healthy so a later disconnect is treated as a
        // one-off instead of another consecutive failure.
        const connectedNode = obj.data?.node || node;
        try {
          this.db_nodes.recordConnected({ node: connectedNode });
        } catch (err) {}
        return this.onMessage(data);
      } else if (command === "send_new_node") {
        const oldNode = node;
        // Key the cooldown on the exact string this master handed out. The
        // worker reports the peer's parsed `{node, port}`, which drops the
        // port and would not match an entry in the node list.
        this.recordNodeFailure(oldNode);
        activeNodes.delete(node);
        const next = this.getNextNode(type);
        node = next.node;
        activeNodes.add(node);
        this.registerWorker(worker, type, node);
        worker.send(
          JSON.stringify({
            command: "new_node",
            data: { node, waitMs: next.waitMs },
          })
        );
        const wait =
          next.waitMs > 0
            ? ` in ${Number(next.waitMs / 1000).toFixed(1)}s`
            : "";
        console.log(
          `master: #${worker.id} ${label}-${oldNode} disconnected trying node: ${node}${wait}`
        );
        return;
      }
      this.onMessage(data);
    });

    const initConfig: any = {
      ...this.workerConfig,
      uid: worker.id,
      command: "init",
      node,
      connectAfterMs: waitMs,
    };
    initConfig[type === "block" ? "blocks" : "mempool"] = true;
    worker.send(`${JSON.stringify(initConfig)}\n\n`);
    console.log(
      `master: Forked ${label}-${node}${
        waitMs > 0 ? ` (waiting ${Number(waitMs / 1000).toFixed(1)}s)` : ""
      }`
    );
    return worker;
  }

  startServer({
    port = 8080,
    host = "localhost",
  }: {
    port: number;
    host?: string;
  }) {
    const server = new Net.Server();
    this.server = server;

    server.listen(port, host, () => {
      console.log(`master: opened socket ${host}:${port}`);
    });

    server.on("connection", (socket) => {
      const uid = `${Math.random()}`;
      this.sockets[uid] = socket;
      console.log(
        `master: A new listener has connected at ${new Date().toLocaleString()}`
      );

      let messageBuffer = "";
      socket.on("data", (message) => {
        try {
          const msgs = `${messageBuffer}${message.toString()}`
            .toString()
            .split("\n\n");
          messageBuffer = msgs[msgs.length - 1];
          for (let i = 0; i < msgs.length - 1; i++) {
            const msg = msgs[i];
            try {
              if (!msg.trim()) continue;
              const obj = JSON.parse(msg.trim());
              const { command } = obj;
              if (command === "mempool_txs") {
                this.mempool_sockets[uid] = socket;
              }
            } catch (err) {
              console.error(
                `master: socket message parse error`,
                err,
                message.length,
                message.toString(),
                msg
              );
            }
          }
        } catch (err) {
          console.error(
            `master: socket message error`,
            err,
            message.length,
            message.toString()
          );
        }
      });

      socket.on("end", () => {
        console.log(
          `master: Listener disconnected at ${new Date().toLocaleString()}`
        );
        try {
          socket.destroy();
        } catch (err) {
          console.error(`master socket end`, err);
        }
        delete this.sockets[uid];
        delete this.mempool_sockets[uid];
      });

      socket.on("error", (err) => {
        console.error(`master: Socket error`, err);
        delete this.sockets[uid];
        delete this.mempool_sockets[uid];
        try {
          socket.destroy();
        } catch (err) {}
      });
    });
  }

  onMessage(data: any) {
    if (typeof data !== "string") return;

    try {
      for (const key in this.sockets) {
        this.sockets[key].write(data);
      }
    } catch (err) {
      console.log(`master: Could not send message`, err, typeof data, data);
    }
  }

  onMempoolTxMessage(data: any) {
    if (typeof data !== "string") return;
    try {
      for (const key in this.mempool_sockets) {
        this.mempool_sockets[key].write(data);
      }
    } catch (err) {
      console.log(`master: Could not send message`, err, typeof data, data);
    }
  }

  getNodes() {
    const nodes: string[] = [];
    const added: Set<string> = new Set();
    this.seed_nodes
      .filter((node) => !added.has(node))
      .map((node) => {
        nodes.push(node);
        added.add(node);
      });
    if (!this.seedNodesOnly) {
      const blacklisted = new Set(this.db_nodes.getBlacklistedNodes());
      this.db_nodes
        .getSeenNodes()
        .filter((node) => !added.has(node) && !blacklisted.has(node))
        .sort(() => Math.random() - Math.random())
        .map((node) => {
          nodes.push(node);
          added.add(node);
        });
      this.db_nodes
        .getConnectedNodes()
        .filter((node) => !added.has(node) && !blacklisted.has(node))
        .sort(() => Math.random() - Math.random())
        .map((node) => {
          nodes.push(node);
          added.add(node);
        });
    }
    // Hosts that recently failed to connect sit out their cooldown. This is
    // what stops the master re-handing the same IP straight after a failure.
    return nodes.filter((node) => !this.isCoolingDown(node)).reverse();
  }

  /** Every known node, regardless of cooldown state. */
  getAllNodes() {
    const nodes: string[] = [];
    const added: Set<string> = new Set();
    for (const node of this.seed_nodes) {
      if (!added.has(node)) {
        nodes.push(node);
        added.add(node);
      }
    }
    if (!this.seedNodesOnly) {
      const blacklisted = new Set(this.db_nodes.getBlacklistedNodes());
      for (const node of this.db_nodes.getSeenNodes()) {
        if (!added.has(node) && !blacklisted.has(node)) {
          nodes.push(node);
          added.add(node);
        }
      }
      for (const node of this.db_nodes.getConnectedNodes()) {
        if (!added.has(node) && !blacklisted.has(node)) {
          nodes.push(node);
          added.add(node);
        }
      }
    }
    return nodes;
  }

  /**
   * Pick the next node for a worker.
   *
   * Returns the node plus how long the worker should wait before dialling it.
   * `waitMs` is only non-zero when every known host is still cooling down
   * after a failed attempt, in which case the shortest outstanding cooldown
   * wins rather than spinning on a host that is known to be down.
   */
  getNextNode(type: WorkerType): { node: string; waitMs: number } {
    const activeNodes =
      type === "block" ? this.block_nodes : this.mempool_nodes;
    const queue =
      type === "block" ? this.queue_block_nodes : this.queue_mempool_nodes;
    const label = type === "block" ? "block" : "mempool";
    const maxTries = Math.max(1, this.mempool + this.blocks);

    for (let i = 0; i < maxTries; i++) {
      if (queue.length === 0) {
        const nodes = this.getNodes();
        // Push in reverse and pop, rather than push(...nodes) and shift.
        // Spreading a large array into push() passes every element as an
        // argument and overflows the stack once a peer store grows past
        // ~125k entries; shift() is also O(n) on an array this size. This
        // dequeue order is identical to the previous shift() behaviour.
        for (let j = nodes.length - 1; j >= 0; j--) queue.push(nodes[j]);
        console.log(`master: Refilling ${label} queue`, queue.length);
        if (queue.length === 0) break;
      }
      const node = queue.pop();
      if (!node) break;
      if (activeNodes.has(node)) continue;
      return { node, waitMs: 0 };
    }

    // Nothing is eligible yet: wait out the shortest remaining cooldown.
    let best: { node: string; waitMs: number } | undefined;
    for (const node of this.getAllNodes()) {
      const waitMs = this.db_nodes.getBackoffRemaining(
        { node },
        { base: this.nodeBackoffBase, max: this.nodeBackoffMax }
      );
      if (!best || waitMs < best.waitMs) best = { node, waitMs };
    }
    if (best) return best;

    return {
      node: this.seed_nodes[Math.floor(Math.random() * this.seed_nodes.length)],
      waitMs: 0,
    };
  }

  async close() {
    this.shuttingDown = true;
    clearInterval(this.memoryInterval);
    const workers = Object.values(this.workers);
    const workerExits = workers.map(
      (worker) =>
        new Promise<void>((resolve) => {
          if (worker.isDead()) return resolve();
          worker.once("exit", () => resolve());
        })
    );
    for (const worker of workers) {
      try {
        worker.send(`${JSON.stringify({ command: "shutdown" })}\n\n`);
      } catch (err) {}
    }
    await Promise.race([
      Promise.all(workerExits),
      new Promise((resolve) => setTimeout(resolve, 1000 * 10)),
    ]);
    for (const worker of workers) {
      if (!worker.isDead()) {
        try {
          worker.kill();
        } catch (err) {}
      }
    }
    for (const key in this.sockets) {
      try {
        this.sockets[key].end();
      } catch (err) {}
    }
    for (const key in this.mempool_sockets) {
      try {
        this.mempool_sockets[key].end();
      } catch (err) {}
    }
    await new Promise<void>((resolve, reject) => {
      if (!this.server || !this.server.listening) return resolve();
      this.server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    await this.db_nodes.close();
  }

  private async shutdown(reason: string) {
    console.log(`master: Shutting down from ${reason}...`);
    try {
      await this.close();
      process.exit(0);
    } catch (err) {
      console.error(`master: Shutdown error`, err);
      process.exit(1);
    }
  }
}
