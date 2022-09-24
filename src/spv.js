const BsvP2p = require("bsv-p2p").default;
const Headers = require("bsv-headers");
const EventEmitter = require("events");
const DbHeaders = require("./db_headers");
const DbBlocks = require("./db_blocks");
const DbMempool = require("./db_mempool");
const DbNodes = require("./db_nodes");
const DbPlugin = require("./db_plugin");
const path = require("path");

class BsvSpv extends EventEmitter {
  constructor({
    ticker,
    node,
    dataDir,
    forceUserAgent,
    saveBlocks = true,
    saveMempool = true,
    autoReconnect = true,
    invalidBlocks = [],
    pruneBlocks = 0, // Maximum number of new blocks to keep. 0 for keeping all blocks
    blockHeight, // Number. Lowest block height syncBlocks will sync to
    COMMAND_TIMEOUT = 1000 * 60 * 10, // Download block timeout. 10 minutes default
    MEMPOOL_PRUNE_AFTER,
    DEBUG_LOG = false,
  }) {
    super();
    this.setMaxListeners(0);
    if (!dataDir) throw Error(`Missing dataDir`);
    this.saveBlocks = saveBlocks;
    this.saveMempool = saveMempool;
    this.pruneBlocks = pruneBlocks;
    this.blockHeight = blockHeight;
    this.ticker = ticker;
    this.node = node;
    this.forceUserAgent = forceUserAgent;
    this.COMMAND_TIMEOUT = COMMAND_TIMEOUT;
    this.peer = new BsvP2p({
      node,
      ticker,
      autoReconnect,
      mempoolTxs: saveMempool,
      DEBUG_LOG,
    });
    this.headers = new Headers({ invalidBlocks });
    dataDir = path.join(dataDir, ticker);
    const headersDir = path.join(dataDir, "headers");
    const blocksDir = path.join(dataDir, "blocks");
    const mempoolDir = path.join(dataDir, "mempool");
    const nodesDir = path.join(dataDir, "nodes");
    const pluginDir = path.join(dataDir, "history", `node-${node}`);
    this.db_blocks = new DbBlocks({ blocksDir });
    this.db_headers = new DbHeaders({
      headersDir,
      headers: this.headers,
      readOnly: false,
    });
    this.db_mempool = new DbMempool({
      mempoolDir,
      pruneAfter: MEMPOOL_PRUNE_AFTER,
      readOnly: false,
    });
    this.db_nodes = new DbNodes({ nodesDir, readOnly: false });
    this.db_plugin = new DbPlugin({ pluginDir, readOnly: false });
    if (saveBlocks) {
      this.db_plugin.loadBlocks();
      let startDate;
      this.peer.on(
        "block_chunk",
        async ({
          header,
          chunk,
          blockHash,
          finished,
          started,
          size,
          height: blockHeight,
          txCount,
        }) => {
          try {
            if (started) {
              startDate = +new Date();
              this.addHeaders({ headers: [header] });
            }
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
              this.db_blocks.markBlockProcessed({
                blockHash,
                height: blockHeight,
                txCount,
                size,
                timer: +new Date() - startDate,
              });
              if (success) {
                this.emit("block_saved", {
                  height: blockHeight,
                  hash,
                  size,
                  startDate,
                  txCount,
                });
              } else {
                this.emit("block_already_saved", {
                  height: blockHeight,
                  hash,
                  size,
                  startDate,
                  txCount,
                });
              }

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

  async addHeaders({ headers }) {
    let newHeaders = 0;
    const prevTip = this.headers.getTip();
    headers.map((header) => this.headers.addHeader({ header }));
    const lastTip = this.headers.process();
    const newTip = this.headers.getTip();
    const { hashes } = await this.db_headers.saveHeaders(headers);
    if (hashes.length > 0) this.emit("headers_saved", { hashes });
    if (lastTip && lastTip.height < prevTip.height) {
      // Chain re-org detected!
      const { height, hash } = lastTip;
      this.emit("block_reorg", { height, hash });
      newHeaders += newTip.height - lastTip.height;
      this.emit("headers_new", { headers });
    } else {
      newHeaders += newTip.height - prevTip.height;
      if (newTip.height - prevTip.height > 0) {
        this.emit("headers_new", { headers });
      }
    }
    return newHeaders;
  }

  syncHeaders() {
    if (!this.promiseSyncHeaders) {
      this.promiseSyncHeaders = new Promise(async (resolve, reject) => {
        let newHeaders = 0;
        while (true) {
          try {
            let from = this.headers.getFromHeaderArray();
            do {
              let lastHash = Array.isArray(from) ? from[0] : from;
              await this.peer.connect();
              const headers = await this.peer.getHeaders({ from });
              if (headers.length === 0) break;
              lastHash = headers[headers.length - 1].getHash();
              newHeaders += await this.addHeaders({ headers });
              if (
                !lastHash ||
                lastHash.toString("hex") === from.toString("hex")
              )
                break;
              from = headers[headers.length - 1].getHash();
            } while (true);
            break;
          } catch (err) {
            const RETRY = 3;
            console.error(
              `Error syncing headers: ${err.message}. Retrying in ${RETRY} seconds....`
            );
            await new Promise((r) => setTimeout(r, RETRY * 1000));
          }
        }
        resolve(newHeaders);
        delete this.promiseSyncHeaders;
      });
    }
    return this.promiseSyncHeaders;
  }

  async connect(options) {
    if (this.connecting) return;
    this.connecting = true;
    this.peer.on("disconnected", (params) => {
      this.emit("disconnected", params);
    });
    this.peer.on("error_message", (params) => {
      this.emit("peer_error", params);
    });
    this.peer.on("connected", (params) => this.emit("connected", params));
    this.peer.on("version", ({ node, version }) => {
      try {
        if (typeof this.forceUserAgent === "string") {
          const { user_agent } = version;
          if (
            !user_agent
              .toLowerCase()
              .includes(this.forceUserAgent.toLowerCase())
          ) {
            this.emit("version_invalid", { user_agent, version, node });
            this.db_nodes.blacklist(node);
            return this.disconnect();
          }
        }
        this.emit("version", { version, node });
        this.db_nodes.connected(node);
      } catch (err) {
        console.error(err);
      }
    });
    this.peer.on("block_hashes", async ({ hashes }) => {
      try {
        this.emit("block_seen", { hashes });
        await this.syncHeaders();
      } catch (err) {
        console.error(err);
      }
    });
    await this.peer.connect(options);
  }
  disconnect() {
    this.connecting = false;
    this.peer.disconnect();
    clearInterval(this.mempoolInterval);
    this.mempoolTxCache = [];
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
  getNodePeers() {
    // Get list of connected peers
    return new Promise(async (resolve, reject) => {
      this.peer.once("addr", async ({ addrs }) => {
        try {
          const { nodes } = await this.db_nodes.saveSeenNodes(addrs);
          this.emit("node_peers", { addrs, nodes });
        } catch (err) {
          console.error(err);
        }
        resolve({ addrs });
      });
      this.peer.getAddr();
    });
  }

  getMempoolTx(txids, getTime = true) {
    const { tx, time } = this.db_mempool.getTx(txids, getTime);
    return { tx, time };
  }
  async getBlockTx({ txid, block, pos, len }) {
    const { tx } = await this.db_blocks.getTx({ txid, block, pos, len });
    return { tx };
  }

  async downloadBlock({ height, hash }) {
    if (!this.db_blocks.blockExists(hash)) {
      await this.peer.connect(); // Wait until connected
      this.emit(`block_downloading`, { hash, height });
      await this.peer.getBlock(hash);
      return true;
    } else {
      this.db_plugin.markBlockProcessed({ height, blockHash: hash });
    }
    return false;
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

  onMempoolTx(opts = {}) {
    const { saveInterval = 200 } = opts;
    if (this.saveMempool) {
      this.mempoolTxCache = [];
      this.mempoolInterval = setInterval(async () => {
        if (this.mempoolTxCache.length > 0) {
          const txs = this.mempoolTxCache;
          this.mempoolTxCache = [];
          const { txids, size } = await this.db_mempool.saveTxs(txs);
          if (txids.length > 0) this.emit(`mempool_txs_saved`, { txids, size });
        }
      }, saveInterval); // Batch mempool txs
    }
    this.peer.on("transactions", ({ header, transactions }) => {
      if (header) return;
      for (const [, transaction] of transactions) {
        this.saveMempool && this.mempoolTxCache.push(transaction);
      }
      this.emit(`mempool_txs`, { transactions });
    });
    this.peer.listenForTxs(async (txids) => {
      try {
        this.emit(`mempool_txs_seen`, { txids });
        if (this.saveMempool) {
          // Only fetch txs we haven't already requested
          const result = await this.db_mempool.saveTimes(txids);
          return result.txids;
        } else {
          return txids;
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  onBlockTx(opts = {}) {
    const { disableAutoDl = false, pruneMempool = true } = opts;
    let startDate, prunedTxs;
    this.peer.on(
      "transactions",
      async ({
        header,
        started,
        finished,
        size,
        height,
        transactions,
        txCount,
      }) => {
        if (!header) return;
        if (started) {
          startDate = +new Date();
          prunedTxs = 0;
        }
        this.emit(`block_txs`, {
          header,
          started,
          finished,
          size,
          height,
          transactions,
          startDate,
          txCount,
        });
        if (pruneMempool) {
          const txidArr = transactions.map(([, tx]) => tx.getHash());
          txCount = prunedTxs;
          const { txids } = await this.db_mempool.delTxs(txidArr);
          txCount += txids.length;
          if (txCount > 0 && finished) {
            this.emit(`mempool_pruned`, {
              txids,
              height,
              header,
              started,
              finished,
              size,
              txCount,
            });
          }
        }
      }
    );
    if (!disableAutoDl) this.peer.listenForBlocks();
  }

  async syncBlocks() {
    let blocksDled = 0;
    if (this.blocksSyncing) return blocksDled;
    this.blocksSyncing = true;

    let tipHeight = this.headers.getHeight();
    if (typeof this.blockHeight !== "number") {
      this.blockHeight = tipHeight + 1;
    } else if (this.blockHeight < 0) {
      this.blockHeight += tipHeight;
    }

    for (let height = this.blockHeight; height <= tipHeight; height++) {
      if (this.db_plugin.isProcessed(height)) continue;
      try {
        const hash = this.headers.getHash(height);
        const blockDownloaded = await this.downloadBlock({ height, hash });
        if (blockDownloaded) blocksDled++;
        tipHeight = this.headers.getHeight();
      } catch (err) {
        const RETRY = 3;
        console.error(
          `syncBlocks error: ${err.message}. Retrying in ${RETRY} seconds...`
        );
        await new Promise((r) => setTimeout(r, RETRY * 1000));
        height--; // Retry height
      }
    }
    this.blocksSyncing = false;
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
        this.emit("block_pruned", { height, hash });
        prunedCount++;
      }
    }
    return prunedCount;
  }

  async pruneMempool(olderThan) {
    const { txids } = await this.db_mempool.pruneTxs(olderThan);
    if (txids.length > 0)
      this.emit(`mempool_pruned`, { txids, txCount: txids.length });
    return { txids };
  }
}

module.exports = BsvSpv;
