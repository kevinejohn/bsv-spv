import Peer from "bsv-p2p";
import { VersionOptions } from "bsv-p2p/lib/messages/version";
import { NetAddress } from "bsv-p2p/lib/messages/address";
import * as bsvMin from "bsv-minimal";
import Headers from "bsv-headers";
import { EventEmitter } from "events";
import DbHeaders from "./db_headers";
import DbBlocks from "./db_blocks";
import DbNodes from "./db_nodes";
import DbListener from "./db_listener";
import * as path from "path";
import { SpvEmitter } from "./types/SpvEmitter";

export interface SpvOptions {
  uid?: string;
  ticker: string;
  node: string;
  dataDir: string;
  forceUserAgent?: string;
  user_agent?: string;
  magic?: string;
  version?: number;
  blocks?: boolean;
  mempool?: boolean;
  validate?: boolean;
  autoReconnect?: boolean;
  autoReconnectWait?: number;
  timeoutConnect?: number;
  versionOptions?: VersionOptions;
  invalidBlocks?: string[];
  pruneBlocks?: number;
  blockHeight?: number;
  DEBUG_LOG?: boolean;
  DEBUG_MEMORY?: boolean;
}

export default class Spv extends (EventEmitter as new () => SpvEmitter) {
  id: string;
  uid: string;
  ticker: string;
  node: string;
  versionOptions?: VersionOptions;
  queue_nodes?: string[];
  saveMempool: boolean;
  pruneBlocks: number;
  blockHeight: number;
  forceUserAgent?: string;
  autoReconnect: boolean;
  autoReconnectWait?: number;
  timeoutConnect: number;
  peer?: Peer;
  headers: Headers;
  db_blocks: DbBlocks;
  db_headers: DbHeaders;
  db_nodes: DbNodes;
  db_listener?: DbListener;
  syncingHeaders?: Promise<number>;
  syncingBlocks: boolean;
  connecting: boolean;
  user_agent?: string;
  magic?: string;
  version?: number;
  mempool: boolean;
  blocks: boolean;
  validate: boolean;
  dataDir: string;
  DEBUG_LOG: boolean;
  getPeersTimeout?: NodeJS.Timeout;
  peerPingInterval?: NodeJS.Timeout;

  constructor({
    uid,
    ticker,
    node,
    dataDir,
    forceUserAgent,
    user_agent,
    magic,
    version,
    blocks = false,
    mempool = false,
    validate = true,
    autoReconnect = true,
    autoReconnectWait,
    timeoutConnect = 1000 * 15, // 15 seconds. Shorter than default
    versionOptions,
    invalidBlocks = [],
    pruneBlocks = 0, // Maximum number of new blocks to keep. 0 for keeping all blocks
    blockHeight = -10, // Number. Lowest block height syncBlocks will sync to
    DEBUG_LOG = false,
  }: SpvOptions) {
    super();
    this.setMaxListeners(0);
    this.uid = uid || `${process.pid}`;
    if (!dataDir) throw Error(`Missing dataDir`);
    this.dataDir = dataDir;
    this.saveMempool = mempool;
    this.pruneBlocks = pruneBlocks;
    this.blockHeight = blockHeight;
    this.autoReconnect = autoReconnect;
    this.autoReconnectWait = autoReconnectWait;
    this.versionOptions = versionOptions;
    this.user_agent = user_agent;
    this.magic = magic;
    this.version = version;
    this.timeoutConnect = timeoutConnect;
    this.DEBUG_LOG = DEBUG_LOG;
    this.connecting = false;
    this.ticker = ticker;
    this.node = node;
    this.mempool = mempool;
    this.blocks = blocks;
    this.validate = validate;
    this.syncingHeaders;
    this.syncingBlocks = false;
    this.forceUserAgent = forceUserAgent;
    this.id = "";
    this.updateId();
    console.log(`${this.id} Loading headers from disk...`);
    const headers = new Headers({ invalidBlocks });
    this.headers = headers;
    const headersDir = path.join(dataDir, ticker, "headers");
    const blocksDir = path.join(dataDir, ticker, "blocks");
    const nodesDir = path.join(dataDir, ticker, "nodes");
    this.db_blocks = new DbBlocks({ blocksDir, readOnly: false });
    this.db_headers = new DbHeaders({ headersDir, headers, readOnly: false });
    this.db_nodes = new DbNodes({ nodesDir, readOnly: false });
  }

  updateId() {
    if (!this.isConnected()) {
      this.id = `#${this.uid} ${this.mempool ? "mempool " : ""}${
        this.blocks ? "blocks" : ""
      }`.trim();
    } else {
      this.id = `#${this.uid} ${this.mempool ? "mempool-" : ""}${
        this.blocks ? "blocks-" : ""
      }${this.node}`;
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
        try {
          let newHeaders = 0;
          // try {
          let from = this.headers
            .getFromHeaderArray()
            .map((o) => Buffer.from(o, "hex"));
          do {
            let lastHash = from[0];

            if (!this.peer) throw Error(`Not connected`);
            const headers: bsvMin.Header[] = await this.peer.getHeaders({
              from,
            });
            if (headers.length === 0) break;
            newHeaders += await this.addHeaders({ headers });
            const lastHeader = headers[headers.length - 1];
            if (lastHash.toString("hex") === lastHeader.getHash(true)) break;
            from = [lastHeader.getHash()];
          } while (true);
          // } catch (err: any) {
          //   const RETRY = 3;
          //   console.error(
          //     `${this.id} could not sync headers: ${err.message}. Retrying in ${RETRY} seconds.... (${err.message})`
          //   );
          //   await new Promise((r) => setTimeout(r, RETRY * 1000));
          // }
          this.syncingHeaders = undefined;
          resolve(newHeaders);
        } catch (err) {
          // console.error(err);
          this.syncingHeaders = undefined;
          reject(err);
        }
      });
    }
    return this.syncingHeaders;
  }

  async connect(node = this.node) {
    if (this.connecting) return;
    this.connecting = true;

    this.node = node;
    let {
      ticker,
      dataDir,
      versionOptions,
      autoReconnect,
      autoReconnectWait,
      user_agent,
      magic,
      version,
      mempool,
      blocks,
      validate,
      DEBUG_LOG,
    } = this;

    this.updateId();

    if (blocks) {
      try {
        const listenerDir = path.join(
          dataDir,
          ticker,
          "history",
          `node-${node}`
        );
        this.db_listener = new DbListener({ listenerDir });
      } catch (err: any) {
        console.error(`Skipping db_listener: ${err.message}`);
      }
    }

    this.peer = new Peer({
      node,
      ticker,
      autoReconnect,
      autoReconnectWait,
      start_height: this.headers.getHeight(),
      user_agent,
      magic: magic ? Buffer.from(magic, "hex") : undefined,
      version,
      validate,
      mempoolTxs: mempool,
      DEBUG_LOG,
    });
    this.peer.timeoutConnect = this.timeoutConnect; // Shorted connect timeout
    let hasConnected = false;
    this.peer.on(
      "disconnected",
      ({
        node,
        port,
        ticker,
        disconnects,
      }: {
        node: string;
        port: number;
        ticker: string;
        disconnects: number;
      }) => {
        // clearInterval(this.peerPingInterval);
        clearTimeout(this.getPeersTimeout);
        if (
          disconnects >= 3 &&
          !hasConnected &&
          !this.db_nodes.hasConnected({ node, port })
        ) {
          this.db_nodes.blacklist({ node, port });
        }
        this.emit("disconnected", { node, ticker, disconnects });
        this.updateId();
      }
    );
    this.peer.on("error_message", (params) => {
      this.emit("peer_error", params);
    });

    this.peer.on("connected", (params) => {
      hasConnected = true;
      clearTimeout(this.getPeersTimeout);
      this.getPeersTimeout = setTimeout(() => {
        try {
          const { node, port } = params;
          this.db_nodes.connected({ node, port }); // Mark as connected
          if (!this.db_nodes.hasSavedSeen()) {
            console.log(`${this.id} Getting node peers...`);
            this.getNodePeers();
          }
        } catch (err) {}
      }, 1000 * 65);
      clearInterval(this.peerPingInterval);
      let failedPings = 0;
      this.peerPingInterval = setInterval(async () => {
        try {
          if (!this.peer) return;
          if (this.syncingBlocks || this.syncingHeaders) return;
          const response_ms = await this.peer.ping(30);
          // console.log(
          //   `${this.id} Ping responded in ${response_ms / 1000} seconds`
          // );
          failedPings = 0;
        } catch (err) {
          if (!this.peer) return;
          if (failedPings++ >= 2) {
            // Reconnect
            console.error(
              `${this.id} Node did not respond to ping ${failedPings} times. Reconnecting...`
            );
            this.peer.disconnects = 0; // Reset disconnects
            this.disconnect();
            this.connect();
          }
        }
      }, 1000 * 60 * 1);
      this.updateId();
      this.emit("connected", params);
    });
    this.peer.on(
      "version",
      ({
        node,
        port,
        version,
      }: {
        node: string;
        port: number;
        version: VersionOptions;
      }) => {
        try {
          if (typeof this.forceUserAgent === "string") {
            const { user_agent } = version;
            const expected_user_agent = this.forceUserAgent.toLowerCase();
            if (
              !user_agent ||
              !user_agent.toLowerCase().includes(expected_user_agent)
            ) {
              this.db_nodes.blacklist({ node, port });
              this.emit("version_invalid", {
                error: `user_agent does not match ${expected_user_agent}: ${user_agent}`,
                user_agent,
                expected_user_agent,
                version,
                node,
              });
              return this.disconnect();
            }
          }
          if (
            !version.start_height ||
            version.start_height < this.headers.getHeight() - 5
          ) {
            this.db_nodes.blacklist({ node, port });
            this.emit("version_invalid", {
              error: `start_height (${
                version.start_height
              }) is less than our height ${this.headers.getHeight()}`,
              version,
              node,
            });
            return this.disconnect();
          }
          this.emit("version", { version, node });
        } catch (err) {
          console.error(err);
        }
      }
    );
    this.peer.on("block_hashes", async ({ hashes }) => {
      try {
        this.emit("block_seen", { hashes });
        await this.syncHeaders();
      } catch (err) {
        // console.error(err);
      }
    });
    this.peer.on("addr", async ({ addrs }: { addrs: NetAddress[] }) => {
      try {
        const nodes = await this.db_nodes.saveSeenNodes(addrs);
        this.db_nodes.markSavedSeen();
        if (nodes > 0)
          console.log(`${this.id} Saved ${nodes} new seen peer nodes`);
      } catch (err) {
        console.error(err);
      }
    });
    // this.peer.on("block", async ({ block }) => {
    //   // Called if streamBlock = false instead of block_chunk
    //   try {
    //     if (!block.header) throw Error(`Block missing header`);
    //     const header = block.header;
    //     const blockHash = header.getHash();
    //     let blockHeight = block.height;
    //     const txCount = block.txCount || 0;
    //     const size = block.size;

    //     this.addHeaders({ headers: [header] });
    //     const success = await this.db_blocks.writeBlockChunk({
    //       chunk: block.toBuffer(),
    //       blockHash,
    //       started: true,
    //       finished: true,
    //     });

    //     const hash = blockHash.toString("hex");
    //     try {
    //       // Height was not included in blocks until v2
    //       // https://en.bitcoin.it/wiki/BIP_0034
    //       // More reliable if we calculate the height
    //       blockHeight = this.headers.getHeight(hash);
    //     } catch (err) {}
    //     if (typeof blockHeight !== "number") throw Error(`Missing blockHeight`);
    //     if (this.db_listener) {
    //       await this.db_listener.markBlockProcessed({
    //         blockHash,
    //         height: blockHeight,
    //         txCount,
    //         size,
    //         // timer: 0,
    //       });
    //     }
    //     if (success) {
    //       this.emit("block_saved", {
    //         height: blockHeight,
    //         hash,
    //         size,
    //         startDate: +new Date(),
    //         txCount,
    //       });
    //     } else {
    //       this.emit("block_already_saved", {
    //         height: blockHeight,
    //         hash,
    //         size,
    //         startDate: +new Date(),
    //         txCount,
    //       });
    //     }

    //     if (this.pruneBlocks > 0) {
    //       const tipHeight =
    //         blockHeight > 0 ? blockHeight : this.headers.getHeight();
    //       const height = tipHeight - this.pruneBlocks;
    //       const hash = this.headers.getHash(height);
    //       this.db_blocks
    //         .delBlock(hash)
    //         .then(() => {
    //           this.emit("pruned_block", { height, hash });
    //         })
    //         .catch((err) => console.error(err));
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    this.peer.on(
      "block_chunk",
      async ({
        header,
        chunk,
        blockHash,
        finished,
        started,
        blockSize,
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
            size: blockSize,
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
              blockHeight = this.headers.getHeight(hash);
            } catch (err) {}
            if (typeof blockHeight !== "number")
              throw Error(`Missing blockHeight`);
            if (this.db_listener) {
              await this.db_listener.markBlockProcessed({
                blockHash,
                height: blockHeight,
                txCount,
                size: blockSize,
                timer: +new Date() - startDate,
              });
            }
            if (success) {
              this.emit("block_saved", {
                height: blockHeight,
                hash,
                size: blockSize,
                startDate,
                txCount,
              });
            } else {
              this.emit("block_already_saved", {
                height: blockHeight,
                hash,
                size: blockSize,
                startDate,
                txCount,
              });
            }

            if (this.pruneBlocks > 0) {
              const tipHeight =
                blockHeight > 0 ? blockHeight : this.headers.getHeight();
              const height = tipHeight - this.pruneBlocks;
              const hash = this.headers.getHash(height);
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
    this.peer.on("tx_mempool", ({ tx }) => {
      // Mempool transactions
      this.emit(`mempool_tx`, { transaction: tx });
    });
    this.peer.on(
      "tx_block",
      ({
        header,
        started,
        finished,
        blockSize,
        height,
        txs,
        txCount,
        startDate,
      }) => {
        // Block transactions
        this.emit(`block_txs`, {
          header,
          started,
          finished,
          size: blockSize,
          height,
          txs,
          startDate,
          txCount,
        });
      }
    );
    if (mempool) {
      this.peer.fetchMempoolTxs((txids) => {
        this.emit(`mempool_txs_seen`, { txids });
        return txids;
      });
    }
    // if (blocks) {
    //   this.peer.fetchNewBlocks((hashes) => {
    //     this.emit(`blocks_seen`, { hashes });
    //     return hashes;
    //   });
    // }
    try {
      await this.peer.connect(versionOptions);
    } catch (err) {
      if (!hasConnected && !this.db_nodes.hasConnected({ node })) {
        this.db_nodes.blacklist({ node });
      }
      // console.error(err);
      this.emit("could_not_connect", { ticker, node });
    }
  }
  disconnect() {
    clearInterval(this.peerPingInterval);
    clearTimeout(this.getPeersTimeout);
    this.syncingBlocks = false;
    this.syncingHeaders = undefined;
    this.connecting = false;
    if (this.peer) {
      try {
        this.peer.disconnect();
      } catch (err) {
        // console.error(err);
      }
      this.peer = undefined;
    }
  }
  isConnected() {
    return this.peer ? this.peer.connected : false;
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
    if (!this.peer) throw Error(`Peer not connected`);
    // Get list of connected peers
    await this.peer.connect();
    return this.peer.getAddr();
  }

  // getMempoolTxs(txids: Buffer[], getTime = true) {
  //   const { txs, times } = this.db_mempool.getTxs(txids, getTime);
  //   return { txs, times };
  // }

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
      if (await this.db_blocks.blockFileExists(hash)) {
        this.db_blocks.markBlockSaved(hash);
      } else {
        if (!this.peer || !this.isConnected())
          throw Error(`Peer not connected`);
        this.emit(`block_downloading`, { hash, height });
        await this.peer.getBlock(hash);
        return true;
      }
    }
    return false;
  }
  readBlock(
    {
      hash,
      height,
      highWaterMark,
    }: { height: number; hash: string; highWaterMark?: number },
    callback: (params: any) => Promise<void>
  ) {
    if (!hash) hash = this.headers.getHash(height);
    if (typeof height !== "number") {
      try {
        height = this.headers.getHeight(hash);
      } catch (err) {}
    }
    return this.db_blocks.streamBlock(
      { hash, height, highWaterMark },
      callback
    );
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
        if (!this.isConnected()) break;
        const RETRY = 3;
        console.error(
          `${this.id} syncBlocks error: ${err.message}. Retrying in ${RETRY} seconds...`
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

  // async pruneMempool(olderThan?: number) {
  //   const txids = await this.db_mempool.pruneTxs(olderThan);
  //   if (txids.length > 0)
  //     this.emit(`mempool_pruned`, { txids, txCount: txids.length });
  //   return { txids };
  // }
}
