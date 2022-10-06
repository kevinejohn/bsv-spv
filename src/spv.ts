import Peer from "bsv-p2p";
import * as bsvMin from "bsv-minimal";
import Headers from "bsv-headers";
import { EventEmitter } from "events";
import DbHeaders from "./db_headers";
import DbBlocks from "./db_blocks";
import DbMempool from "./db_mempool";
import DbNodes from "./db_nodes";
import DbListener from "./db_listener";
import * as path from "path";

export interface SpvOptions {
  ticker: string;
  node: string;
  dataDir: string;
  forceUserAgent?: string;
  user_agent?: string;
  start_height?: number;
  version?: number;
  blocks?: boolean;
  mempool?: boolean;
  autoReconnect?: boolean;
  invalidBlocks?: string[];
  pruneBlocks?: number;
  blockHeight?: number;
  MEMPOOL_PRUNE_AFTER?: number;
  DEBUG_LOG?: boolean;
  DEBUG_MEMORY?: boolean;
}

export default class Spv extends EventEmitter {
  id: string;
  ticker: string;
  node: string;
  saveBlocks: boolean;
  saveMempool: boolean;
  pruneBlocks: number;
  blockHeight: number;
  forceUserAgent?: string;
  peer: Peer;
  headers: Headers;
  db_blocks: DbBlocks;
  db_headers: DbHeaders;
  db_mempool: DbMempool;
  db_nodes: DbNodes;
  db_listener: DbListener;
  syncingHeaders?: Promise<number>;
  syncingBlocks: boolean;
  connecting: boolean;
  mempoolInterval?: NodeJS.Timer;
  mempoolTxCache: bsvMin.Transaction[];

  constructor({
    ticker,
    node,
    dataDir,
    forceUserAgent,
    user_agent,
    start_height,
    version,
    blocks = false,
    mempool = false,
    autoReconnect = true,
    invalidBlocks = [],
    pruneBlocks = 0, // Maximum number of new blocks to keep. 0 for keeping all blocks
    blockHeight = -10, // Number. Lowest block height syncBlocks will sync to
    MEMPOOL_PRUNE_AFTER,
    DEBUG_LOG = false,
  }: SpvOptions) {
    super();
    this.setMaxListeners(0);
    if (!dataDir) throw Error(`Missing dataDir`);
    this.id = `${mempool ? "mempool-" : ""}${blocks ? "blocks-" : ""}${node}`;
    this.saveBlocks = blocks;
    this.saveMempool = mempool;
    this.pruneBlocks = pruneBlocks;
    this.blockHeight = blockHeight;
    this.connecting = false;
    this.ticker = ticker;
    this.node = node;
    this.syncingHeaders;
    this.syncingBlocks = false;
    this.mempoolTxCache = [];
    this.forceUserAgent = forceUserAgent;
    console.log(`${this.id} Loading headers from disk...`);
    const headers = new Headers({ invalidBlocks });
    this.headers = headers;
    const headersDir = path.join(dataDir, ticker, "headers");
    const blocksDir = path.join(dataDir, ticker, "blocks");
    const mempoolDir = path.join(dataDir, ticker, "mempool");
    const nodesDir = path.join(dataDir, ticker, "nodes");
    const listenerDir = path.join(
      dataDir,
      ticker,
      "history",
      `node-${node.replace(":", "-")}`,
      "/data"
    );
    this.db_blocks = new DbBlocks({ blocksDir, readOnly: false });
    this.db_headers = new DbHeaders({ headersDir, headers, readOnly: false });
    this.db_mempool = new DbMempool({
      mempoolDir,
      pruneAfter: MEMPOOL_PRUNE_AFTER,
      readOnly: false,
    });
    this.db_nodes = new DbNodes({ nodesDir, readOnly: false });
    this.db_listener = new DbListener({ listenerDir });
    if (typeof start_height !== 'number') start_height = headers.getHeight()
    this.peer = new Peer({
      node,
      ticker,
      autoReconnect,
      start_height,
      user_agent,
      version,
      mempoolTxs: mempool,
      DEBUG_LOG,
    });
    if (this.saveBlocks) {
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
          startDate,
        }) => {
          try {
            this.emit("block_chunk", {
              header,
              chunk,
              blockHash,
              finished,
              started,
              size,
              height: blockHeight,
              txCount,
              startDate,
            });
            if (started) this.addHeaders({ headers: [header] });
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
                blockHeight = headers.getHeight(hash);
              } catch (err) {}
              this.db_listener.markBlockProcessed({
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
                const tipHeight =
                  blockHeight > 0 ? blockHeight : this.headers.getHeight();
                const height = tipHeight - this.pruneBlocks;
                const hash = headers.getHash(height);
                this.db_blocks
                  .delBlock(hash)
                  .then(() => {
                    this.emit("pruned_block", { height, hash });
                  })
                  .catch((err) => console.error(err));
              }
            }
          } catch (err) {
            console.error(err);
          }
        }
      );
    }
  }

  async addHeaders({ headers }: { headers: bsvMin.Header[] }) {
    let newHeaders = 0;
    const prevTip = this.headers.getTip();
    headers.map((header) => this.headers.addHeader({ header }));
    const lastTip = this.headers.process();
    const newTip = this.headers.getTip();
    const hashes = await this.db_headers.saveHeaders(headers);
    if (hashes.length > 0) this.emit("headers_saved", { hashes });
    if (lastTip && lastTip.height && lastTip.height < prevTip.height) {
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

  async syncHeaders(): Promise<number> {
    if (!this.syncingHeaders) {
      this.syncingHeaders = new Promise(async (resolve, reject) => {
        let newHeaders = 0;
        while (true) {
          try {
            let from = this.headers
              .getFromHeaderArray()
              .map((o) => Buffer.from(o, "hex"));
            do {
              let lastHash = from[0];
              await this.peer.connect();
              const headers: bsvMin.Header[] = await this.peer.getHeaders({
                from,
              });
              if (headers.length === 0) break;
              newHeaders += await this.addHeaders({ headers });
              const lastHeader = headers[headers.length - 1];
              if (lastHash.toString("hex") === lastHeader.getHash(true)) break;
              from = [lastHeader.getHash()];
            } while (true);
            break;
          } catch (err: any) {
            const RETRY = 3;
            console.error(
              `Error syncing headers: ${err.message}. Retrying in ${RETRY} seconds....`,
              err
            );
            await new Promise((r) => setTimeout(r, RETRY * 1000));
          }
        }
        delete this.syncingHeaders;
        resolve(newHeaders);
      });
    }
    return this.syncingHeaders;
  }

  async connect(options?: any) {
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
          const expected_user_agent = this.forceUserAgent.toLowerCase();
          if (!user_agent.toLowerCase().includes(expected_user_agent)) {
            this.emit("version_invalid", {
              user_agent,
              expected_user_agent,
              version,
              node,
            });
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
    this.mempoolTxCache = [];
  }
  getHeight(hash?: string) {
    return this.headers.getHeight(hash);
  }
  getHash(height: number) {
    return this.headers.getHash(height);
  }
  getTip() {
    return this.headers.getTip();
  }
  getHeader({ height, hash }: { height: number; hash?: string }) {
    if (!hash) hash = this.headers.getHash(height);
    if (!hash) throw Error(`Missing hash`);
    return this.db_headers.getHeader(hash);
  }
  async getNodePeers() {
    // Get list of connected peers
    await this.peer.connect();
    return this.peer.getAddr();
  }

  getMempoolTxs(txids: Buffer[], getTime = true) {
    const { txs, times } = this.db_mempool.getTxs(txids, getTime);
    return { txs, times };
  }

  async getBlockTx({
    txid,
    block,
    pos,
    len,
  }: {
    txid?: string;
    block: string;
    pos: number;
    len: number;
  }) {
    const { tx } = await this.db_blocks.getTx({ txid, block, pos, len });
    return { tx };
  }

  async downloadBlock({ height, hash }: { height: number; hash: string }) {
    if (!this.db_blocks.blockExists(hash)) {
      await this.peer.connect(); // Wait until connected
      this.emit(`block_downloading`, { hash, height });
      await this.peer.getBlock(hash);
      return true;
    }
    return false;
  }
  readBlock(
    { hash, height }: { height: number; hash: string },
    callback: (params: any) => Promise<void>
  ) {
    if (!hash) hash = this.headers.getHash(height);
    if (typeof height !== "number") {
      try {
        height = this.headers.getHeight(hash);
      } catch (err) {}
    }
    return this.db_blocks.streamBlock({ hash, height }, callback);
  }

  onMempoolTx() {
    if (this.saveMempool) {
      this.mempoolTxCache = [];
      clearInterval(this.mempoolInterval);
      this.mempoolInterval = setInterval(async () => {
        if (this.mempoolTxCache.length > 0) {
          const txs = this.mempoolTxCache;
          this.mempoolTxCache = [];
          const { txids, size } = await this.db_mempool.saveTxs(txs);
          if (txids.length > 0) this.emit(`mempool_txs_saved`, { txids, size });
        }
      }, 300); // Batch mempool txs
    }
    this.peer.on("transactions", ({ header, transactions }) => {
      if (header) return;
      for (const [, transaction] of transactions) {
        this.saveMempool && this.mempoolTxCache.push(transaction);
      }
      this.emit(`mempool_txs`, { transactions });
    });
    this.peer.fetchMempoolTxs(async (txids) => {
      this.emit(`mempool_txs_seen`, { txids });
      if (this.saveMempool) {
        // Only fetch txs we haven't already requested
        const savedTxids = await this.db_mempool.saveTimes(txids);
        return savedTxids;
      } else {
        return txids;
      }
    });
  }

  onBlockTx({ disableAutoDl = false }: { disableAutoDl?: boolean }) {
    let prunedTxs: number;
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
        startDate,
      }) => {
        if (!header) return;
        if (started) {
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
        const txidArr = transactions.map(
          ([, tx]: [number, bsvMin.Transaction]) => tx.getHash()
        );
        txCount = prunedTxs;
        const txids = await this.db_mempool.delTxs(txidArr);
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
    );
    if (!disableAutoDl) this.peer.fetchNewBlocks((hashes) => hashes);
  }

  async syncBlocks() {
    let blocksDled = 0;
    if (this.syncingBlocks) return blocksDled;
    this.syncingBlocks = true;

    let tipHeight = this.headers.getHeight();
    if (typeof this.blockHeight !== "number") {
      this.blockHeight = tipHeight + 1;
    } else if (this.blockHeight < 0) {
      this.blockHeight += tipHeight;
    }

    for (let height = this.blockHeight; height <= tipHeight; height++) {
      try {
        const hash = this.headers.getHash(height);
        const blockDownloaded = await this.downloadBlock({ height, hash });
        if (blockDownloaded) blocksDled++;
        tipHeight = this.headers.getHeight();
      } catch (err: any) {
        const RETRY = 3;
        console.error(
          `syncBlocks error: ${err.message}. Retrying in ${RETRY} seconds...`
        );
        await new Promise((r) => setTimeout(r, RETRY * 1000));
        height--; // Retry height
      }
    }
    this.syncingBlocks = false;
    return blocksDled;
  }

  async warningPruneBlocks() {
    let prunedCount = 0;
    if (!(this.pruneBlocks > 0)) return prunedCount;
    const files = await this.db_blocks.getBlocks();
    const pruneHeight = this.headers.getHeight() - this.pruneBlocks;
    for (const file of files) {
      const hash = file.split(".")[0];
      if (hash.length === 64) {
        let height;
        try {
          height = this.headers.getHeight(hash);
          if (height <= pruneHeight) throw Error(`Prune`);
        } catch (err) {
          await this.db_blocks.delBlock(file);
          this.emit("block_pruned", { height, hash });
          prunedCount++;
        }
      }
    }
    return prunedCount;
  }

  async pruneMempool(olderThan?: number) {
    const txids = await this.db_mempool.pruneTxs(olderThan);
    if (txids.length > 0)
      this.emit(`mempool_pruned`, { txids, txCount: txids.length });
    return { txids };
  }
}
