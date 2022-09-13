const P2P = require("bsv-p2p");
const Headers = require("bsv-headers");
const EventEmitter = require("events");
const DbHeaders = require("./db_headers");
const DbBlocks = require("./db_blocks");
const path = require("path");

class BsvSpv extends EventEmitter {
  constructor({
    ticker,
    node,
    dataDir,
    saveBlocks = true,
    invalidBlocks = [],
    pruneBlocks = 0, // Maximum number of new blocks to keep. 0 for keeping all blocks
    syncBlocks = 0, // Number of newest blocks syncAllBlocks will sync. 0 for syncing to genesis
    COMMAND_TIMEOUT = 1000 * 60 * 10, // 10 minutes
  }) {
    super();
    if (!dataDir) throw Error(`Missing dataDir`);
    this.saveBlocks = saveBlocks;
    this.pruneBlocks = pruneBlocks;
    this.syncBlocks = syncBlocks;
    this.ticker = ticker;
    this.COMMAND_TIMEOUT = COMMAND_TIMEOUT;
    this.peer = new P2P({ node, ticker });
    this.headers = new Headers({ invalidBlocks });
    const headersDir = path.join(dataDir, "headers");
    const blocksDir = path.join(dataDir, "blocks");
    this.db_blocks = new DbBlocks({ blocksDir });
    this.db_headers = new DbHeaders({ headersDir, headers: this.headers });
    if (saveBlocks) {
      let writeStream;
      let writeDir;
      this.peer.on(
        "block_chunk",
        async ({
          chunk,
          blockHash,
          finished,
          started,
          size,
          height: blockHeight,
        }) => {
          try {
            const success = await this.db_blocks.writeBlockChunk({
              chunk,
              blockHash,
              started,
              finished,
            });
            if (finished) {
              const hash = blockHash.toString("hex");
              try {
                // Height was not included in blocks until v2
                // https://en.bitcoin.it/wiki/BIP_0034
                // More reliable if we calculate the height
                blockHeight = this.headers.getHeight(hash);
              } catch (err) {}
              if (success) {
                this.emit("block_saved", {
                  height: blockHeight,
                  hash,
                  size,
                });
              }
              this.emit(`block_ready_${hash}`);

              if (this.pruneBlocks > 0) {
                try {
                  const tipHeight =
                    blockHeight > 0 ? blockHeight : this.headers.getHeight();
                  const height = tipHeight - this.pruneBlocks;
                  const hash = this.headers.getHash(height);
                  this.db_blocks.delBlock(hash);
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
    try {
      let from = this.headers.getFromHeaderArray();
      do {
        let lastHash = Array.isArray(from) ? from[0] : from;
        await this.peer.connect();
        const headers = await this.peer.getHeaders({ from });
        if (headers.length === 0) break;
        lastHash = headers[headers.length - 1].getHash();
        const reorgTip = await this.db_headers.saveHeaders(headers);
        if (reorgTip) {
          // Chain re-org detected!
          const { height, hash } = reorgTip;
          this.emit("reorg_detected", { height, hash });
        }
        this.emit("new_headers", { headers });
        if (!lastHash || lastHash.toString("hex") === from.toString("hex"))
          break;
        from = headers[headers.length - 1].getHash();
      } while (true);

      if (!this.syncing) {
        this.syncing = true;
        this.peer.on("block_hashes", ({ hashes }) => {
          this.emit("block_hashes", { hashes });
          this.syncHeaders();
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async connect() {
    if (this.connecting) return;
    this.connecting = true;
    this.peer.on("disconnected", (params) => {
      this.emit("disconnected", params);
    });
    this.peer.on("connected", (params) => this.emit("connected", params));
    this.peer.on("version", (params) => this.emit("version", params));
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
    return this.db_headers.getHeader(hash);
  }
  async downloadBlock({ height, hash }) {
    if (!hash) hash = this.headers.getHash(height);
    hash = hash.toString("hex");
    if (!this.db_blocks.blockExists(hash)) {
      await this.peer.connect(); // Wait until connected

      const event = `block_ready_${hash}`;
      let listener, timeout;
      try {
        const promise = new Promise((resolve, reject) => {
          listener = () => {
            clearTimeout(timeout);
            resolve();
          };
          this.once(event, listener);
          timeout = setTimeout(
            () => reject(Error(`Timeout`)),
            this.COMMAND_TIMEOUT
          );
        });
        await this.peer.getBlock(hash);
        await promise; // Wait until block is fully downloaded and ready
      } catch (err) {
        clearTimeout(timeout);
        this.removeListener(event, listener);
        throw err;
      }
    } else {
      return true;
    }
  }
  async readBlock({ height, hash }, callback) {
    if (!hash) hash = this.headers.getHash(height);
    height = this.headers.getHeight(hash);
    await this.db_blocks.streamBlock({ hash, height }, callback);
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

  async syncAllBlocks(opts = {}) {
    let { endHeight, syncBlocks, checkAll = false } = opts;
    let blocksDled = 0;
    let height = this.headers.getHeight();
    if (!(endHeight >= 0)) {
      if (syncBlocks > 0) {
        endHeight = height - syncBlocks;
      } else if (this.pruneBlocks > 0) {
        endHeight = height - this.pruneBlocks;
      } else if (this.syncBlocks > 0) {
        endHeight = height - this.syncBlocks;
      }
    }
    if (!(endHeight >= 0)) endHeight = 0;
    for (height; height >= endHeight; height--) {
      try {
        const alreadyDled = await this.downloadBlock({ height });
        if (alreadyDled && !checkAll) break;
        if (!alreadyDled) blocksDled++;
      } catch (err) {
        console.error(
          `syncAllBlocks error: ${err.message}. Retrying in 3 seconds...`
        );
        await new Promise((r) => setTimeout(r, 3000));
        height++; // Retry height
      }
    }
    return blocksDled;
  }

  async warningPruneBlocks() {
    let prunedCount = 0;
    if (!(this.pruneBlocks > 0)) return prunedCount;
    const files = this.db_blocks.getBlocks();
    const pruneHeight = this.headers.getHeight() - this.pruneBlocks;
    for (const file of files) {
      const hash = file.split(".")[0];
      let height;
      try {
        height = this.headers.getHeight(hash);
        if (height <= pruneHeight) throw Error(`Prune`);
      } catch (err) {
        this.db_blocks.delBlock(file);
        this.emit("pruned_block", { height, hash });
        prunedCount++;
      }
    }
    return prunedCount;
  }
}

module.exports = BsvSpv;
