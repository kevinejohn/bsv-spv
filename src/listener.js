const EventEmitter = require("events");
const DbMempool = require("./db_mempool");
const DbBlocks = require("./db_blocks");
const DbHeaders = require("./db_headers");
const Headers = require("bsv-headers");
const Net = require("net");
const path = require("path");

class Listener extends EventEmitter {
  constructor({ dataDir, ticker, host = "localhost", port = 8080 }) {
    super();
    if (!ticker) throw Error(`Missing ticker!`);
    this.host = host;
    this.port = port;
    this.reconnectTime = 1; // 1 second
    const startDate = +new Date();

    console.log(`Loading headers from disk....`);

    dataDir = path.join(dataDir, ticker);
    const mempoolDir = path.join(dataDir, "mempool");
    const blocksDir = path.join(dataDir, "blocks");
    const headersDir = path.join(dataDir, "headers");

    this.headers = new Headers();
    this.db_mempool = new DbMempool({ mempoolDir });
    this.db_blocks = new DbBlocks({ blocksDir });
    this.db_headers = new DbHeaders({ headersDir, headers: this.headers });

    this.db_headers.loadHeaders();
    const { height, hash } = this.headers.getTip();
    console.log(
      `Loaded headers in ${
        (+new Date() - startDate) / 1000
      } seconds. Latest tip: ${height}, ${hash}`
    );
  }

  async reconnect() {
    try {
      this.client.destroy();
    } catch (err) {}
    await new Promise((r) => setTimeout(r, 1000 * this.reconnectTime));
    return this.connect();
  }

  connect() {
    const { host, port, reconnectTime } = this;

    const client = new Net.Socket();
    this.client = client;
    client.connect(port, host, () => {
      console.log(`Connected to ${host}:${port}!`);
      // client.write("Hello World!");
    });

    client.on("data", (message) => {
      try {
        const obj = JSON.parse(message.toString());
        const { command, data } = obj;
        if (command === "headers_saved") {
          const { hashes } = data;
          for (const hash of hashes) {
            const header = this.db_headers.getHeader(hash);
            this.headers.addHeader({ header });
          }
          this.headers.process();
        }
        this.emit(command, data);
      } catch (err) {
        console.error(err);
      }
    });

    client.on("close", () => {
      console.error(`Disconnected! Reconnecting in ${reconnectTime} second...`);
      this.reconnect();
    });

    client.on("error", (err) => {
      console.error(
        `Socket error! Reconnecting in ${reconnectTime} seconds...`,
        err
      );
      this.reconnect();
    });
  }

  readBlock({ hash, height }, callback) {
    if (!hash) hash = this.headers.getHash(height);
    if (typeof height !== "number") {
      try {
        height = this.headers.getHeight(hash);
      } catch (err) {}
    }
    return this.db_blocks.streamBlock({ hash, height }, callback);
  }
  getMempoolTx(hash) {
    return this.db_mempool.getTx(hash);
  }
}

module.exports = Listener;
