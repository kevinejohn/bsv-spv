const P2P = require("bsv-p2p");
const Headers = require("bsv-headers");
const EventEmitter = require("events");
const DbHeaders = require("./db_headers");
const bsv = require("bsv-minimal");
const fs = require("fs");
const path = require("path");

class BsvSpv extends EventEmitter {
  constructor({
    ticker,
    node,
    dataDir,
    saveBlocks = true,
    invalidBlocks = [],
    pruneBlocks = 0, // Maximum number of new blocks to keep. 0 for keeping all blocks
  }) {
    super();
    if (!dataDir) throw Error(`Missing dataDir`);
    this.saveBlocks = saveBlocks;
    this.pruneBlocks = pruneBlocks;
    this.ticker = ticker;
    this.peer = new P2P({ node, ticker });
    this.headers = new Headers({ invalidBlocks });
    this.headerDir = path.join(dataDir, "headers");
    this.blocksDir = path.join(dataDir, "blocks");
    fs.mkdirSync(this.headerDir, { recursive: true });
    fs.mkdirSync(this.blocksDir, { recursive: true });
    this.db = new DbHeaders({ dataDir: this.headerDir, headers: this.headers });
    if (saveBlocks) {
      let writeStream;
      let writeDir;
      this.peer.on(
        "block_chunk",
        ({
          chunk,
          blockHash,
          finished,
          started,
          size,
          height: blockHeight,
        }) => {
          try {
            if (started) {
              writeDir = path.join(
                this.blocksDir,
                `${blockHash.toString("hex")}.bin`
              );
              try {
                fs.unlinkSync(`${writeDir}.${process.pid}`);
              } catch (err) {}
              writeStream = fs.createWriteStream(`${writeDir}.${process.pid}`);
            }
            writeStream.write(chunk);
            if (finished) {
              const hash = blockHash.toString("hex");
              try {
                // Height was not included in blocks until v2
                // https://en.bitcoin.it/wiki/BIP_0034
                // More reliable if we calculate the height
                blockHeight = this.headers.getHeight(hash);
              } catch (err) {}
              const dir = writeDir;
              writeStream.close((err) => {
                if (!err && !fs.existsSync(dir)) {
                  // Save block to disk
                  fs.renameSync(`${dir}.${process.pid}`, dir);
                  this.emit("block_saved", { height: blockHeight, hash, size });
                } else {
                  // Block already saved. Delete copy
                  try {
                    fs.unlinkSync(`${dir}.${process.pid}`);
                  } catch (err) {}
                }
              });
              if (this.pruneBlocks > 0) {
                try {
                  const tipHeight =
                    blockHeight > 0 ? blockHeight : this.headers.getHeight();
                  const height = tipHeight - this.pruneBlocks;
                  const hash = this.headers.getHash(height);
                  const dir = path.join(this.blocksDir, `${hash}.bin`);
                  fs.unlinkSync(dir);
                  this.emit("pruned_block", { height, hash });
                } catch (err) {}
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
      );
    }
  }

  async syncHeaders() {
    let from = this.headers.getFromHeaderArray();
    do {
      let lastHash = Array.isArray(from) ? from[0] : from;
      await this.peer.connect();
      const headers = await this.peer.getHeaders({ from });
      if (headers.length === 0) break;
      this.emit("new_headers", { headers });
      lastHash = headers[headers.length - 1].getHash();
      const reorgTip = await this.db.saveHeaders(headers);
      if (reorgTip) {
        // Chain re-org detected!
        const { height, hash } = reorgTip;
        this.emit("reorg_detected", { height, hash });
      }
      if (!lastHash || lastHash.toString("hex") === from.toString("hex")) break;
      from = headers[headers.length - 1].getHash();
    } while (true);

    if (!this.syncing) {
      this.syncing = true;
      this.peer.on("block_hashes", ({ hashes }) => {
        this.emit("block_hashes", { hashes });
        this.syncHeaders(callback);
      });
    }
  }

  async connect() {
    if (this.connecting) return;
    this.connecting = true;
    this.peer.on("disconnected", (params) => this.emit("disconnected", params));
    this.peer.on("connected", (params) => this.emit("connected", params));
    await this.peer.connect();
  }
  getHeight(hash = false) {
    return this.headers.getHeight(hash);
  }
  getHash(height) {
    return this.headers.getHash(height);
  }
  getTip() {
    return this.headers.getTip();
  }
  getHeader({ height, hash }) {
    if (!hash) hash = this.headers.getHash(height);
    return this.db.getHeader(hash);
  }
  async downloadBlock({ height, hash }) {
    if (!hash) hash = this.headers.getHash(height);
    hash = hash.toString("hex");
    const dir = path.join(this.blocksDir, `${hash}.bin`);
    if (!fs.existsSync(dir)) {
      await this.peer.connect(); // Wait until connected
      await this.peer.getBlock(hash);
    }
  }
  readBlock({ height, hash }, callback) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof callback !== "function") throw Error(`Missing callback`);
        if (!hash) hash = this.headers.getHash(height);
        hash = hash.toString("hex");
        const dir = path.join(this.blocksDir, `${hash}.bin`);
        if (!fs.existsSync(dir)) throw Error(`Missing block ${hash}`);
        height = this.headers.getHeight(hash);

        const block = new bsv.Block();
        const stream = fs.createReadStream(dir);
        stream.on("data", async (data) => {
          try {
            const result = block.addBufferChunk(data);
            // const { finished, started, size, transactions, header } = result;
            stream.pause();
            await callback({ ...result, height });
            stream.resume();
          } catch (err) {
            stream.destroy();
            reject(err);
          }
        });
        stream.on("end", () => resolve());
        stream.on("error", (err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  }

  onMempoolTx(callback, filterTxs = true) {
    this.peer.on("transactions", ({ header, transactions }) => {
      if (header) return;
      for (const [index, transaction] of transactions) {
        try {
          callback({ transaction });
        } catch (err) {
          console.error(err);
        }
      }
    });
    this.peer.listenForTxs(filterTxs);
  }

  onBlockTx(callback) {
    this.peer.on(
      "transactions",
      ({ header, started, finished, size, height, transactions }) => {
        if (!header) return;
        try {
          callback({ header, started, finished, size, height, transactions });
        } catch (err) {
          console.error(err);
        }
      }
    );
    this.peer.listenForBlocks();
  }

  async syncAllBlocks() {
    let height = this.headers.getHeight();
    const endBlock =
      this.pruneBlocks > 0 ? Math.max(0, height - this.pruneBlocks + 1) : 0;
    for (height; height >= endBlock; height--) {
      try {
        await this.downloadBlock({ height });
      } catch (err) {
        console.error(
          `syncAllBlocks error: ${err.message}. Retrying in 3 seconds...`
        );
        await new Promise((r) => setTimeout(r, 3000));
        await this.syncAllBlocks(); // May hit max recursive loop
      }
    }
  }

  async warningPruneBlocks() {
    if (!(this.pruneBlocks > 0)) return;
    const files = fs.readdirSync(this.blocksDir);
    const pruneHeight = this.headers.getHeight() - this.pruneBlocks;
    for (const file of files) {
      const hash = file.split(".")[0];
      let height;
      try {
        height = this.headers.getHeight(hash);
        if (height <= pruneHeight) throw Error(`Prune`);
      } catch (err) {
        fs.unlinkSync(path.join(this.blocksDir, file));
        this.emit("pruned_block", { height, hash });
      }
    }
  }
}

module.exports = BsvSpv;
