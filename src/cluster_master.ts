import cluster, { Worker } from "cluster";
import { SpvOptions } from "./spv";
import DbNodes from "./db_nodes";
import DbBlocks from "./db_blocks";
import * as Helpers from "./helpers";
import Net from "net";
import path from "path";

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Master Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Master Uncaught Exception thrown");
  process.exit(1);
});

export interface MasterOptions {
  ticker: string;
  nodes: string[];
  seedNodesOnly?: boolean;
  enableIpv6?: boolean;
  mempool: number;
  blocks: number;
  validate?: boolean;
  forceUserAgent?: string;
  user_agent?: string;
  magic?: string;
  version?: number;
  invalidBlocks?: string[];
  dataDir: string;
  pruneBlocks: number;
  blockHeight: number;
  DEBUG_LOG?: boolean;
  DEBUG_MEMORY?: boolean;
}

export default class Master {
  sockets: { [key: string]: Net.Socket };
  mempool_sockets: { [key: string]: Net.Socket };
  workers: { [key: string]: Worker };
  server?: Net.Server;
  db_nodes: DbNodes;
  queue_block_nodes: string[];
  queue_mempool_nodes: string[];
  block_nodes: Set<string>;
  mempool_nodes: Set<string>;
  seed_nodes: string[];
  mempool: number;
  blocks: number;
  seedNodesOnly: boolean;

  constructor({
    ticker,
    nodes,
    seedNodesOnly = false,
    enableIpv6 = false,
    forceUserAgent,
    user_agent,
    magic,
    version,
    invalidBlocks,
    dataDir,
    pruneBlocks,
    blockHeight,
    mempool = 0,
    blocks = 0,
    validate,
    DEBUG_LOG,
    DEBUG_MEMORY,
  }: MasterOptions) {
    this.sockets = {};
    this.mempool_sockets = {};
    this.workers = {};

    cluster.on("exit", (worker, code, signal) => {
      console.error(
        `master: Worker ${worker.id} exited with code: ${code}, signal: ${signal}`
      );
      process.exit(code); // TODO: Recover instead of shutting down
    });

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
      version,
      invalidBlocks,
      dataDir,
      pruneBlocks,
      blockHeight,
      validate,
      autoReconnectWait: 100,
      DEBUG_LOG,
      DEBUG_MEMORY,
    };

    for (let i = 0; i < blocks; i++) {
      let node = this.getNextNode("block");
      let worker = cluster.fork();
      worker.on("message", async (data) => {
        if (typeof data !== "string") return;
        try {
          const { command } = JSON.parse(data);
          if (command === "send_new_node") {
            const oldNode = node;
            this.block_nodes.delete(node);
            node = this.getNextNode("block");
            this.block_nodes.add(node);
            // await new Promise((r) => setTimeout(r, 100));
            worker.send(
              JSON.stringify({ command: "new_node", data: { node } })
            );
            console.log(
              `master: #${worker.id} blocks-${oldNode} disconnected trying node: ${node}`
            );
            return;
          }
        } catch (err) {}
        this.onMessage(data);
      });
      this.block_nodes.add(node);
      worker.send(
        `${JSON.stringify({
          ...workerConfig,
          uid: worker.id,
          command: "init",
          node,
          blocks: true,
        })}\n\n`
      );
      this.workers[`blocks-${node}`] = worker;
      console.log(`master: Forked blocks-${node}`);
    }

    for (let i = 0; i < mempool; i++) {
      let node = this.getNextNode("mempool");
      let worker = cluster.fork();
      worker.on("message", async (data) => {
        if (typeof data !== "string") return;
        try {
          const { command } = JSON.parse(data);
          if (command === "mempool_tx") {
            return this.onMempoolTxMessage(data);
          } else if (command === "send_new_node") {
            const oldNode = node;
            this.mempool_nodes.delete(node);
            node = this.getNextNode("mempool");
            this.mempool_nodes.add(node);
            // await new Promise((r) => setTimeout(r, 100));
            worker.send(
              JSON.stringify({ command: "new_node", data: { node } })
            );
            console.log(
              `master: #${worker.id} mempool-${oldNode} disconnected trying node: ${node}`
            );
            return;
          }
        } catch (err) {}
        this.onMessage(data);
      });
      this.mempool_nodes.add(node);
      worker.send(
        `${JSON.stringify({
          ...workerConfig,
          uid: worker.id,
          command: "init",
          node,
          mempool: true,
        })}\n\n`
      );
      this.workers[`mempool-${node}`] = worker;
      console.log(`master: Forked mempool-${node}`);
    }

    if (DEBUG_MEMORY) {
      setInterval(() => {
        const m: any = process.memoryUsage();
        console.log(
          `master: Memory: ${Object.keys(m)
            .map((key: string) => `${key}: ${Helpers.formatBytes(m[key])}`)
            .join(", ")}`
        );
      }, 1000 * 60);
    }
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
    return nodes.reverse();
  }

  getNextNode(type: "block" | "mempool") {
    let node;
    for (let i = 0; i < this.mempool + this.blocks; i++) {
      if (type === "block") {
        if (this.queue_block_nodes.length === 0) {
          this.queue_block_nodes = this.getNodes();
          console.log(
            `master: Refilling block queue`,
            this.queue_block_nodes.length
          );
        }
        node = this.queue_block_nodes.pop();
        if (node && !this.block_nodes.has(node)) break;
      } else if (type === "mempool") {
        if (this.queue_mempool_nodes.length === 0) {
          this.queue_mempool_nodes = this.getNodes();
          console.log(
            `master: Refilling mempool queue`,
            this.queue_mempool_nodes.length
          );
        }
        node = this.queue_mempool_nodes.pop();
        if (node && !this.mempool_nodes.has(node)) break;
      } else {
        throw Error(`Invalid type`);
      }
    }
    return (
      node ||
      this.seed_nodes[Math.floor(Math.random() * this.seed_nodes.length)]
    );
  }
}
