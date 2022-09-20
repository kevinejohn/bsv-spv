const EventEmitter = require("events");
const DbMempool = require("./db_mempool");
const DbBlocks = require("./db_blocks");
const DbHeaders = require("./db_headers");
const DbPlugin = require("./db_plugin");
const Headers = require("bsv-headers");
const Net = require("net");
const path = require("path");
const Helpers = require("./helpers");

class Listener extends EventEmitter {
  constructor({
    name, // Name of plugin
    blockHeight = 0, // Number. Block height you want to start reading from
    dataDir,
    ticker,
    host = "localhost",
    port = 8080,
  }) {
    super();
    if (!name) throw Error(`Missing plugin name`);
    if (!ticker) throw Error(`Missing ticker!`);
    this.host = host;
    this.port = port;
    this.blockHeight = blockHeight;
    this.reconnectTime = 1; // 1 second
    const startDate = +new Date();

    console.log(`Loading headers from disk....`);

    dataDir = path.join(dataDir, ticker);
    const mempoolDir = path.join(dataDir, "mempool");
    const blocksDir = path.join(dataDir, "blocks");
    const headersDir = path.join(dataDir, "headers");
    const pluginDir = path.join(dataDir, "listeners", name);

    const headers = new Headers();
    this.headers = headers;
    this.db_mempool = new DbMempool({ mempoolDir });
    this.db_blocks = new DbBlocks({ blocksDir });
    this.db_headers = new DbHeaders({ headersDir, headers });
    this.db_plugin = new DbPlugin({ pluginDir, headers, readOnly: false });

    this.db_headers.loadHeaders();
    this.db_plugin.loadBlocks();
    const { height, hash } = this.headers.getTip();
    if (blockHeight < 0) this.blockHeight = height + blockHeight;
    console.log(
      `Loaded headers in ${
        (+new Date() - startDate) / 1000
      } seconds. Latest tip: ${height}, ${hash}`
    );
  }

  async reconnect() {
    if (!this.reconnectPromise) {
      this.reconnectPromise = await new Promise((resolve, reject) => {
        this.disconnect();
        setTimeout(() => {
          this.connect();
          resolve();
          delete this.reconnectPromise;
        }, this.reconnectTime * 1000);
      });
    }
    return this.reconnectPromise;
  }
  disconnect() {
    try {
      this.client.destroy();
    } catch (err) {}
    this.client = null;
    clearInterval(this.interval);
  }

  connect() {
    if (this.client) return;
    const { host, port, reconnectTime } = this;

    let txsSeen = 0;
    let txsSize = 0;

    const client = new Net.Socket();
    this.client = client;
    client.connect(port, host, () => {
      console.log(`Connected to ${host}:${port}!`);
      // client.write("Hello World!");
      this.db_headers.loadHeaders();
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
          const tip = this.headers.getTip();
          console.log(`New headers loaded. Tip ${tip.height}, ${tip.hash}`);
        } else if (command === "mempool_txs_saved") {
          txsSeen += data.hashes.length;
          txsSize += data.size;
        } else if (command === "block_reorg") {
          const { height, hash } = data;
          console.warn(`Block re-org after height ${height}, ${hash}!`);
          const from = height + 1;
          const to = this.headers.getHeight();
          delBlocks(from, to);
        } else if ("block_saved") {
          const { height, hash } = data;
          console.log(`New block saved ${height}, ${hash}`);
        }
        this.emit(command, data);
      } catch (err) {
        console.error(err, message.toString());
      }
    });

    client.on("close", () => {
      console.error(`Disconnected! Attempting in ${reconnectTime} second...`);
      this.reconnect();
    });

    client.on("error", (err) => {
      // console.error(
      //   `Socket error! Reconnecting in ${reconnectTime} seconds...`,
      //   err
      // );
      this.reconnect();
    });

    const REFRESH = 10; // 10 seconds
    this.interval = setInterval(() => {
      console.log(
        `Seen ${txsSeen} mempool txs in ${REFRESH} seconds. ${Helpers.formatBytes(
          txsSize
        )}`
      );
      txsSeen = 0;
      txsSize = 0;
    }, REFRESH * 1000);
  }

  syncBlocks(callback) {
    if (!this.promiseSyncBlock) {
      this.promiseSyncBlock = new Promise(async (resolve, reject) => {
        try {
          let processed = 0;
          let skipped = 0;
          let blockSize = 0;
          const date = +new Date();
          let tip = this.headers.getTip();
          for (let height = this.blockHeight; height <= tip.height; height++) {
            if (
              this.db_plugin.isProcessed(height) &&
              this.headers.getHash(height) ===
                this.db_plugin.getHash(height).toString("hex")
            )
              continue;
            try {
              let errors = 0;
              let matches = 0;

              await this.readBlock({ height }, async (params) => {
                if (params.started) {
                  console.log(
                    `Streaming block ${height}, ${params.header
                      .getHash()
                      .toString("hex")}...`
                  );
                }
                try {
                  const match = await callback(params);
                  if (match > 0) matches += match;
                } catch (err) {
                  errors++;
                }
                if (params.finished) {
                  const { header, size, txCount, startDate } = params;
                  const blockHash = header.getHash().toString("hex");
                  const timer = +new Date() - startDate;
                  this.db_plugin.markBlockProcessed({
                    blockHash,
                    height,
                    matches,
                    errors,
                    size,
                    txCount,
                    timer,
                  });
                  processed++;
                  blockSize += size;
                  console.log(
                    `Streamed block ${height} ${header
                      .getHash()
                      .toString("hex")}, ${txCount} txs, ${Number(
                      size
                    ).toLocaleString("en-US")} bytes in ${
                      (+new Date() - startDate) / 1000
                    } seconds.`
                  );
                }
              });
            } catch (err) {
              // console.error(err);
              // Block not saved
              skipped++;
            }
            tip = this.headers.getTip();
          }
          console.log(
            `Synced ${processed} blocks (${Helpers.formatBytes(
              blockSize
            )}) in ${
              (+new Date() - date) / 1000
            } seconds. ${skipped} blocks missing. ${this.db_plugin.blocksProcessed()}/${
              tip.height
            } blocks processed.`
          );
          resolve({ skipped, processed, blockSize });
        } catch (err) {
          reject(err);
        }
        delete this.promiseSyncBlock;
      });
    }
    return this.promiseSyncBlock;
  }
  getBlockInfo({ height, hash }) {
    if (!hash) hash = this.headers.getHash(height);
    return this.db_plugin.getBlockInfo(hash);
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
  getMempoolTxs(txHashes, getTime) {
    if (!Array.isArray(txHashes)) txHashes = [txHashes];
    return this.db_mempool.getTxs(txHashes, getTime);
  }
}

module.exports = Listener;
