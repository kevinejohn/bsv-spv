import cluster, { Worker } from "cluster";
import { SpvOptions } from "./spv";
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
  nodes: string[];
  forceUserAgent?: string;
  user_agent?: string;
  invalidBlocks?: string[];
  dataDir: string;
  pruneBlocks: number;
  blockHeight: number;
  mempool: boolean;
  blocks: boolean;
  MEMPOOL_PRUNE_AFTER: number;
  DEBUG_LOG?: boolean;
}

export default class Master {
  sockets: { [key: string]: Net.Socket };
  workers: { [key: string]: Worker };
  server?: Net.Server;

  constructor({
    ticker,
    nodes,
    forceUserAgent,
    user_agent,
    invalidBlocks,
    dataDir,
    pruneBlocks,
    blockHeight,
    mempool,
    blocks,
    MEMPOOL_PRUNE_AFTER,
    DEBUG_LOG,
  }: MasterOptions) {
    this.sockets = {};
    this.workers = {};

    cluster.on("exit", (worker, code, signal) => {
      console.error(
        `Worker ${worker.id} exited with code: ${code}, signal: ${signal}`
      );
    });

    for (const node of nodes) {
      let worker;

      const workerConfig: SpvOptions = {
        ticker,
        node,
        forceUserAgent,
        user_agent,
        invalidBlocks,
        dataDir,
        pruneBlocks,
        blockHeight,
        MEMPOOL_PRUNE_AFTER,
        DEBUG_LOG,
      };
      if (blocks) {
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
        console.log(`Forked blocks-${node}`);
      }
      if (mempool) {
        worker = cluster.fork();
        worker.on("message", (data) => this.onMessage(data));
        worker.send(
          `${JSON.stringify({
            ...workerConfig,
            command: "init",
            mempool: true,
          })}\n\n`
        );
        this.workers[`mempool-${node}`] = worker;
        console.log(`Forked mempool-${node}`);
      }
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
      console.log(`Master opened socket ${host}:${port}`);
    });

    server.on("connection", (socket) => {
      const uid = `${Math.random()}`;
      this.sockets[uid] = socket;
      console.log(`A new listener has connected.`);

      socket.on("data", (chunk) => {
        // const obj = JSON.parse(chunk.toString());
      });

      socket.on("end", () => {
        console.log("Listener disconnected.");
        try {
          socket.destroy();
        } catch (err) {
          console.error(err);
        }
        delete this.sockets[uid];
      });

      socket.on("error", (err) => {
        console.error(`Socket error`, err);
        try {
          socket.destroy();
        } catch (err) {
          console.error(err);
        }
        delete this.sockets[uid];
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
      console.log(`Could not send message`, err, typeof data, data);
    }
  }
}
