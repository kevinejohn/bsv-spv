import cluster, { Worker } from "cluster";
import { SpvOptions } from "./spv";
import * as Helpers from "./helpers";
import Net from "net";

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Master Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Master Uncaught Exception thrown");
  process.exit(1);
});

export interface MasterOptions {
  ticker: string;
  nodes?: string[];
  nodes_blocks?: string[];
  nodes_mempool?: string[];
  forceUserAgent?: string;
  user_agent?: string;
  version?: number;
  invalidBlocks?: string[];
  dataDir: string;
  pruneBlocks: number;
  blockHeight: number;
  mempool: boolean;
  blocks: boolean;
  MEMPOOL_PRUNE_AFTER: number;
  DEBUG_LOG?: boolean;
  DEBUG_MEMORY?: boolean;
}

export default class Master {
  sockets: { [key: string]: Net.Socket };
  mempool_sockets: { [key: string]: Net.Socket };
  workers: { [key: string]: Worker };
  server?: Net.Server;

  constructor({
    ticker,
    nodes,
    nodes_blocks,
    nodes_mempool,
    forceUserAgent,
    user_agent,
    version,
    invalidBlocks,
    dataDir,
    pruneBlocks,
    blockHeight,
    mempool,
    blocks,
    MEMPOOL_PRUNE_AFTER,
    DEBUG_LOG,
    DEBUG_MEMORY,
  }: MasterOptions) {
    this.sockets = {};
    this.mempool_sockets = {};
    this.workers = {};

    cluster.on("exit", (worker, code, signal) => {
      console.error(
        `master Worker ${worker.id} exited with code: ${code}, signal: ${signal}`
      );
      process.exit(code); // TODO: Recover instead of shutting down
    });

    if (!nodes && !nodes_blocks && !nodes_mempool)
      throw Error(`Missing nodes array`);

    if (blocks || nodes_blocks) {
      const array =
        nodes && nodes_blocks
          ? [...nodes, ...nodes_blocks]
          : nodes_blocks || nodes || [];
      if (array.length === 0) throw Error(`No block nodes`);
      for (const node of array) {
        let worker;

        const workerConfig: SpvOptions = {
          ticker,
          node,
          forceUserAgent,
          user_agent,
          version,
          invalidBlocks,
          dataDir,
          pruneBlocks,
          blockHeight,
          MEMPOOL_PRUNE_AFTER,
          DEBUG_LOG,
          DEBUG_MEMORY,
        };
        worker = cluster.fork();
        worker.on("message", (data) => this.onMessage(data));
        worker.send(
          `${JSON.stringify({
            ...workerConfig,
            command: "init",
            blocks: true,
          })}\n\n`
        );
        this.workers[`blocks-${node}`] = worker;
        console.log(`master Forked blocks-${node}`);
      }
    }
    if (mempool || nodes_mempool) {
      const array =
        nodes && nodes_mempool
          ? [...nodes, ...nodes_mempool]
          : nodes_mempool || nodes || [];
      if (array.length === 0) throw Error(`No mempool nodes`);
      for (const node of array) {
        let worker;

        const workerConfig: SpvOptions = {
          ticker,
          node,
          forceUserAgent,
          user_agent,
          version,
          invalidBlocks,
          dataDir,
          pruneBlocks,
          blockHeight,
          MEMPOOL_PRUNE_AFTER,
          DEBUG_LOG,
          DEBUG_MEMORY,
        };

        worker = cluster.fork();
        worker.on("message", (data) => {
          try {
            const { command } = JSON.parse(data.toString());
            if (command === "mempool_tx") {
              this.onMempoolTxMessage(data);
            } else {
              this.onMessage(data);
            }
          } catch (err) {
            console.error(err);
          }
        });
        worker.send(
          `${JSON.stringify({
            ...workerConfig,
            command: "init",
            mempool: true,
          })}\n\n`
        );
        this.workers[`mempool-${node}`] = worker;
        console.log(`master Forked mempool-${node}`);
      }
    }

    if (DEBUG_MEMORY) {
      setInterval(() => {
        const m: any = process.memoryUsage();
        console.log(
          `master Memory: ${Object.keys(m)
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
      console.log(`master opened socket ${host}:${port}`);
    });

    server.on("connection", (socket) => {
      const uid = `${Math.random()}`;
      this.sockets[uid] = socket;
      console.log(
        `master A new listener has connected at ${new Date().toLocaleString()}`
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
              console.error(err, message.length, message.toString(), msg);
            }
          }
        } catch (err) {
          console.error(err, message.length, message.toString());
        }
      });

      socket.on("end", () => {
        console.log(
          `master Listener disconnected at ${new Date().toLocaleString()}`
        );
        try {
          socket.destroy();
        } catch (err) {
          console.error(err);
        }
        delete this.sockets[uid];
        delete this.mempool_sockets[uid];
      });

      socket.on("error", (err) => {
        console.error(`Socket error`, err);
        try {
          socket.destroy();
        } catch (err) {
          console.error(err);
        }
        delete this.sockets[uid];
        delete this.mempool_sockets[uid];
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
      console.log(`master Could not send message`, err, typeof data, data);
    }
  }

  onMempoolTxMessage(data: any) {
    if (typeof data !== "string") return;
    try {
      for (const key in this.mempool_sockets) {
        this.mempool_sockets[key].write(data);
      }
    } catch (err) {
      console.log(`master Could not send message`, err, typeof data, data);
    }
  }
}
