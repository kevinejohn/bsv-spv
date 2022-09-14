const cluster = require("cluster");
const Net = require("net");

class Master {
  constructor(config) {
    const { port = 8080, host = "localhost" } = config;
    this.config = config;
    this.port = port;
    this.host = host;
    this.sockets = {};
    this.workers = {};

    cluster.on("exit", (worker, code, signal) => {
      console.error(
        `Worker ${worker.id} exited with code: ${code}, signal: ${signal}`
      );
    });

    for (const node of config.nodes) {
      let worker = cluster.fork();
      worker.on("message", (data) => this.onMessage(data));
      worker.send(
        JSON.stringify({ ...config, node, command: "init", blocks: true })
      );
      this.workers[`blocks-${node}`] = worker;

      worker = cluster.fork();
      worker.on("message", (data) => this.onMessage(data));
      worker.send(
        JSON.stringify({ ...config, node, command: "init", mempool: true })
      );
      this.workers[`mempool-${node}`] = worker;
    }
  }

  startServer() {
    const { port, host } = this;
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
        delete this.sockets[uid];
      });

      socket.on("error", (err) => {
        console.error(`Socket error`, err);
        socket.end();
      });
    });
  }

  onMessage(data) {
    const keys = Object.keys(this.sockets);
    // console.log(`Master sending to ${keys.length} sockets: ${data}`);
    keys.map((key) => this.sockets[key].write(data));
  }
}

module.exports = Master;