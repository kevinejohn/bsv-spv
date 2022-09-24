import cluster, { Worker } from "cluster";
import Net from "net";

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Master Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Master Uncaught Exception thrown");
  process.exit(1);
});

export default class Master {
  config: any; // TODO: Fix
  sockets: { [key: string]: Net.Socket };
  workers: { [key: string]: Worker };
  server?: Net.Server;

  constructor(config: any) {
    // TODO: Fix
    this.config = config;
    this.sockets = {};
    this.workers = {};

    cluster.on("exit", (worker, code, signal) => {
      console.error(
        `Worker ${worker.id} exited with code: ${code}, signal: ${signal}`
      );
    });

    const { blocks = true, mempool = true } = config;

    for (const node of config.nodes) {
      let worker;
      if (blocks) {
        worker = cluster.fork();
        worker.on("message", (data) => this.onMessage(data));
        worker.send(
          `${JSON.stringify({ ...config, node, command: "init", blocks })}\n\n`
        );
        this.workers[`blocks-${node}`] = worker;
      }
      if (mempool) {
        worker = cluster.fork();
        worker.on("message", (data) => this.onMessage(data));
        worker.send(
          `${JSON.stringify({ ...config, node, command: "init", mempool })}\n\n`
        );
        this.workers[`mempool-${node}`] = worker;
      }
    }
  }

  startServer({ port = 8080, host = "localhost" }) {
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
