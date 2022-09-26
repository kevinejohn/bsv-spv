import EventEmitter from "events";
import DbMempool from "./db_mempool";
import DbBlocks from "./db_blocks";
import DbHeaders from "./db_headers";
import DbPlugin from "./db_plugin";
import Headers from "bsv-headers";
import Net from "net";
import path from "path";
import * as Helpers from "./helpers";
import { BlockStream } from "bsv-minimal";

export default class Listener extends EventEmitter {
  ticker: string;
  host?: string;
  port?: number;
  blockHeight: number;
  reconnectTime: number;
  disableInterval: boolean;
  db_mempool: DbMempool;
  db_blocks: DbBlocks;
  db_headers: DbHeaders;
  db_plugin: DbPlugin;
  headers: any; // Fix
  reconnectTimeout?: NodeJS.Timeout;
  interval?: NodeJS.Timer;
  client?: Net.Socket;
  txsSeen: number;
  txsSize: number;
  promiseSyncBlock?: Promise<{
    skipped: number;
    processed: number;
    blockSize: number;
  }>;

  constructor({
    name, // Name of plugin
    blockHeight = 0, // Number. Block height you want to start reading from
    dataDir,
    ticker,
    disableInterval = false,
  }: {
    name: string;
    blockHeight: number;
    dataDir: string;
    ticker: string;
    disableInterval?: boolean;
  }) {
    super();
    this.setMaxListeners(0);
    if (!name) throw Error(`Missing plugin name`);
    if (!ticker) throw Error(`Missing ticker!`);
    if (!dataDir) throw Error(`Missing dataDir`);
    this.ticker = ticker;
    this.blockHeight = blockHeight;
    this.reconnectTime = 1; // 1 second
    this.disableInterval = disableInterval;
    this.txsSeen = 0;
    this.txsSize = 0;
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
    this.db_plugin = new DbPlugin({ pluginDir, readOnly: false });

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
              ? `. Reconnecting in ${this.reconnectTime} seconds...`
              : ""
          }`
        );
      }
    } catch (err) {}
    this.client = undefined;
    clearInterval(this.interval);
    clearTimeout(this.reconnectTimeout);
  }

  onMessage(obj: { command: string; data: any }) {
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
      this.txsSeen += data.txids.length;
      this.txsSize += data.size;
    } else if (command === "block_reorg") {
      const { height, hash } = data;
      console.warn(`Block re-org after height ${height}, ${hash}!`);
      const from = height + 1;
      const to = this.headers.getHeight();
      this.db_plugin.delBlocks(from, to);
    } else if (command === "block_saved") {
      const { height, hash } = data;
      console.log(`New block saved ${height}, ${hash}`);
    } else {
      console.log(`Unknown command: ${JSON.stringify(obj)}`);
    }
    this.emit(command, data);
  }

  connect({ host = "localhost", port = 8080 }) {
    if (this.client) return;
    this.host = host;
    this.port = port;

    this.txsSeen = 0;
    this.txsSize = 0;

    const client = new Net.Socket();
    this.client = client;
    client.connect(port, host, () => {
      console.log(`Connected to ${host}:${port}!`);
      // client.write("Hello World!");
      this.db_headers.loadHeaders();
    });

    client.on("data", (message) => {
      try {
        const msgs = message.toString().split("\n\n");
        for (const msg of msgs) {
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

  syncBlocks(
    callback: (
      params: BlockStream
    ) => Promise<{ matches: number; errors?: number }>
  ) {
    if (!this.promiseSyncBlock) {
      this.promiseSyncBlock = new Promise(async (resolve, reject) => {
        try {
          let processed = 0;
          let skipped = 0;
          let blockSize = 0;
          const date = +new Date();
          let tip = this.headers.getTip();
          for (let height = this.blockHeight; height <= tip.height; height++) {
            const hash = this.headers.getHash(height);
            if (
              this.db_plugin.isProcessed(height) &&
              hash === this.db_plugin.getHash(height)
            )
              continue;
            try {
              let errors = 0;
              let matches = 0;

              await this.readBlock({ height, hash }, async (params: any) => {
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
                  const blockHash = header.getHash("hex");
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
  getBlockInfo({ height, hash }: { height: number; hash: string }) {
    if (!hash) hash = this.headers.getHash(height);
    return this.db_plugin.getBlockInfo(hash);
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
  getMempoolTxs(txids: Buffer[], getTime: boolean) {
    if (!Array.isArray(txids)) txids = [txids];
    return this.db_mempool.getTxs(txids, getTime);
  }
}
