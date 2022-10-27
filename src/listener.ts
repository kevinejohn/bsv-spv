import EventEmitter from "events";
import DbBlocks from "./db_blocks";
import DbHeaders from "./db_headers";
import DbListener from "./db_listener";
import Headers from "bsv-headers";
import Net from "net";
import path from "path";
import * as Helpers from "./helpers";
import * as bsv from "bsv-minimal";

export interface ListenerOptions {
  name: string;
  blockHeight: number;
  dataDir: string;
  ticker: string;
  disableInterval?: boolean;
  DEBUG_MEMORY?: boolean;
  multithread?: {
    // Optional. Sync only blocks that equals: (((height + index) % threads) === 0). Used for speeding up block syncing using multi-threading
    threads: number; // Number of threads
    index: number; // #0-#(threads - 1) index of thread
  };
}

export default class Listener extends EventEmitter {
  ticker: ListenerOptions["ticker"];
  name: ListenerOptions["name"];
  blockHeight: ListenerOptions["blockHeight"];
  disableInterval: ListenerOptions["disableInterval"];
  multithread?: ListenerOptions["multithread"];
  host: string;
  port: number;
  mempool_txs: boolean;
  reconnectTime: number;
  db_blocks: DbBlocks;
  db_headers: DbHeaders;
  db_listener: DbListener;
  headers: Headers; // Fix
  reconnectTimeout?: NodeJS.Timeout;
  interval?: NodeJS.Timer;
  client?: Net.Socket;
  txsSeen: number;
  txsSize: number;
  syncingBlocks: boolean;

  constructor({
    name, // Name of plugin
    blockHeight = 0, // Number. Block height you want to start reading from
    dataDir,
    ticker,
    disableInterval = false,
    multithread,
    DEBUG_MEMORY = false,
  }: ListenerOptions) {
    super();
    this.setMaxListeners(0);
    if (DEBUG_MEMORY) {
      setInterval(() => {
        const m: any = process.memoryUsage();
        console.log(
          `Memory: ${Object.keys(m)
            .map((key: string) => `${key}: ${Helpers.formatBytes(m[key])}`)
            .join(", ")}`
        );
      }, 1000 * 60);
    }
    if (!name) throw Error(`Missing plugin name`);
    if (!ticker) throw Error(`Missing ticker!`);
    if (!dataDir) throw Error(`Missing dataDir`);
    this.ticker = ticker;
    this.name = name;
    this.mempool_txs = true;
    this.blockHeight = blockHeight;
    this.reconnectTime = 1; // 1 second
    this.host = "localhost";
    this.port = 8080;
    this.disableInterval = disableInterval;
    this.txsSeen = 0;
    this.txsSize = 0;
    this.syncingBlocks = false;
    this.multithread = multithread;
    const startDate = +new Date();

    const blocksDir = path.join(dataDir, ticker, "blocks");
    const headersDir = path.join(dataDir, ticker, "headers");
    const listenerDir = path.join(dataDir, ticker, "listeners", name);

    console.log(`Loading headers from disk....`);
    const headers = new Headers();
    this.headers = headers;
    this.db_blocks = new DbBlocks({ blocksDir });
    this.db_headers = new DbHeaders({
      headersDir,
      headers,
    });
    this.db_listener = new DbListener({ listenerDir });

    this.db_headers.loadHeaders();
    const { height, hash } = this.headers.getTip();
    if (blockHeight < 0) this.blockHeight = height + blockHeight;
    console.log(
      `Loaded headers in ${
        (+new Date() - startDate) / 1000
      } seconds. Latest tip: ${height}, ${hash}`
    );
  }

  reconnect() {
    this.disconnect();
    this.reconnectTimeout = setTimeout(
      () => this.connect({ host: this.host, port: this.port }),
      this.reconnectTime * 1000
    );
  }
  disconnect() {
    try {
      if (this.client) {
        this.client.destroy();
        console.log(
          `Disconnected from ${this.host}:${this.port}${
            this.reconnectTime > 0
              ? ` at ${new Date().toLocaleString()}. Reconnecting in ${
                  this.reconnectTime
                } seconds...`
              : ""
          }`
        );
      }
    } catch (err) {}
    this.client = undefined;
    this.syncingBlocks = false;
    clearInterval(this.interval);
    clearTimeout(this.reconnectTimeout);
  }

  onMessage(obj: { command: string; data: any }) {
    let { command, data } = obj;
    if (command === "headers_saved") {
      const { hashes } = data;
      for (const hash of hashes) {
        try {
          const header = this.db_headers.getHeader(hash);
          this.headers.addHeader({ header });
        } catch (err) {
          console.error(err);
        }
      }
      this.headers.process();
      const tip = this.headers.getTip();
      console.log(
        `New headers loaded. Tip ${tip.height}, ${
          tip.hash
        } at ${new Date().toLocaleString()}`
      );
    } else if (command === "mempool_tx") {
      const buf = Buffer.from(data.transaction, "base64");
      const transaction = bsv.Transaction.fromBuffer(buf);
      this.txsSeen++;
      this.txsSize += transaction.length;
      data.transaction = transaction;
    } else if (command === "block_reorg") {
      const { height, hash } = data;
      console.warn(
        `Block re-org after height ${height}, ${hash} at ${new Date().toLocaleString()}!`
      );
      const from = height + 1;
      const to = this.headers.getHeight();
      this.db_listener.delBlocks(from, to);
    } else if (command === "block_saved") {
      const { height, hash } = data;
      // console.log(
      //   `New block saved ${height}, ${hash} at ${new Date().toLocaleString()}`
      // );
      try {
        const header = this.db_headers.getHeader(hash);
        this.headers.addHeader({ header });
      } catch (err) {
        console.error(err);
      }
      if (height < this.blockHeight) return; // Ignore event if block height is less than listeners start block
    } else {
      console.log(`Unknown command: ${JSON.stringify(obj)}`);
    }
    this.emit(command, data);
  }

  connect({
    host = this.host,
    port = this.port,
    mempool_txs = true,
  }: {
    host?: string;
    port: number;
    mempool_txs?: boolean;
  }) {
    if (this.client) return;
    this.host = host;
    this.port = port;
    this.mempool_txs = mempool_txs;

    this.txsSeen = 0;
    this.txsSize = 0;

    const client = new Net.Socket();
    this.client = client;
    client.connect(port, host, () => {
      console.log(
        `Connected to ${host}:${port} at ${new Date().toLocaleString()}!`
      );
      if (mempool_txs)
        client.write(`${JSON.stringify({ command: "mempool_txs" })}\n\n`);
      this.db_headers.loadHeaders();
    });

    let messageBuffer = "";
    client.on("data", (message) => {
      try {
        const msgs = `${messageBuffer}${message.toString()}`
          .toString()
          .split("\n\n");
        messageBuffer = msgs[msgs.length - 1];
        for (let i = 0; i < msgs.length - 1; i++) {
          const msg = msgs[i];
          try {
            if (!msg.trim()) continue;
            const obj = JSON.parse(msg.trim());
            this.onMessage(obj);
          } catch (err) {
            console.error(err, message.length, message.toString(), msg);
          }
        }
      } catch (err) {
        console.error(err, message.length, message.toString());
      }
    });

    client.on("close", () => {
      // console.error(
      //   `Disconnected! Reconnecting to ${host}:${port} ${this.reconnectTime} in seconds...`
      // );
      this.reconnect();
    });

    client.on("error", (err) => {
      // console.error(
      //   `Socket error! Reconnecting in ${this.reconnectTime} seconds...`,
      //   err
      // );
      this.reconnect();
    });

    if (!this.disableInterval) {
      const REFRESH = 10; // 10 seconds
      this.interval = setInterval(() => {
        console.log(
          `Seen ${
            this.txsSeen
          } mempool txs in ${REFRESH} seconds. ${Helpers.formatBytes(
            this.txsSize
          )}`
        );
        this.txsSeen = 0;
        this.txsSize = 0;
      }, REFRESH * 1000);
    }
  }

  async syncBlocks(
    callback: (
      params: bsv.BlockStream
    ) =>
      | Promise<{ matches: number; errors?: number }>
      | { matches: number; errors?: number }
      | void
  ) {
    if (this.syncingBlocks) return;
    this.syncingBlocks = true;
    try {
      let processed = 0;
      let skipped = 0;
      let blockSize = 0;
      const date = +new Date();
      let tip = this.headers.getTip();
      // console.log(
      //   `Syncing blocks from ${this.blockHeight} to ${tip.height}...`
      // );
      for (let height = this.blockHeight; height <= tip.height; height++) {
        if (this.multithread) {
          if (
            (height + this.multithread.index) % this.multithread.threads !==
            0
          ) {
            continue;
          }
        }

        const hash = this.headers.getHash(height);
        if (this.db_listener.isProcessed(height)) {
          if (height < tip.height - 1000) continue;
          if (hash === this.db_listener.getHash(height)) continue;
        }
        const blockDate = +new Date();
        const interval = setInterval(() => {
          console.log(
            `Syncing block: ${height}/${tip.height} ${hash} in ${
              (+new Date() - blockDate) / 1000
            } seconds...`
          );
        }, 1000 * 10);
        try {
          let errors = 0;
          let matches = 0;
          await this.readBlock(
            { height, hash },
            async (params: bsv.BlockStream) => {
              // Fix any
              // if (params.started) {
              //   console.log(
              //     `Streaming block ${height}, ${params.header
              //       .getHash()
              //       .toString("hex")}...`
              //   );
              // }
              const result = await callback(params);
              if (result) {
                if (result.matches) matches += result.matches;
                if (result.errors) errors += result.errors;
              }
              if (params.finished) {
                const { header, size, txCount, startDate } = params;
                const blockHash = header ? header.getHash(true) : "";
                const timer = +new Date() - startDate;
                this.db_listener.markBlockProcessed({
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
                const seconds = (+new Date() - startDate) / 1000;
                console.log(
                  `Streamed block ${height}/${this.headers.getHeight()} ${blockHash}, ${txCount} txs in ${seconds} seconds. ${Helpers.formatSpeeds(
                    size,
                    seconds
                  )} at ${new Date().toLocaleString()}.`
                );
              }
            }
          );
        } catch (err: any) {
          // console.error(
          //   `Block ${height}/${tip.height} ${hash} not saved: ${err.message}`
          // );
          // Block not saved
          skipped++;
        }
        tip = this.headers.getTip();
        clearInterval(interval);
      }
      const seconds = (+new Date() - date) / 1000;
      console.log(
        `Synced ${processed} blocks (${Helpers.formatSpeeds(
          blockSize,
          seconds
        )} in ${seconds} seconds. ${skipped} blocks missing. ${
          this.db_listener.blocksProcessed() - 1
        }/${tip.height} blocks processed at ${new Date().toLocaleString()}`
      );
      this.syncingBlocks = false;
      return { skipped, processed, blockSize };
    } catch (err) {
      console.error(err);
      this.syncingBlocks = false;
      throw err;
    }
  }
  getBlockInfo({ height, hash }: { height: number; hash: string }) {
    if (!hash) hash = this.headers.getHash(height);
    return this.db_listener.getBlockInfo(hash);
  }

  async readBlock(
    { hash, height }: { height: number; hash: string },
    callback: (params: bsv.BlockStream) => Promise<any>
  ): Promise<boolean> {
    if (!hash) hash = this.headers.getHash(height);
    if (typeof height !== "number") {
      try {
        height = this.headers.getHeight(hash);
      } catch (err) {}
    }
    if (!this.db_blocks.blockExists(hash)) throw Error(`Block not saved`);
    return this.db_blocks.streamBlock({ hash, height }, callback);
  }
}
