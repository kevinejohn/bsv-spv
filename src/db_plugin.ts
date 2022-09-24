import lmdb from "node-lmdb";
import fs from "fs";

export interface PluginOptions {
  blockHash: string | Buffer;
  height: number;
  matches?: number;
  errors?: number;
  txCount?: number;
  size?: number;
  timer?: number;
}

export default class DbPlugin {
  processedBlocks: { [key: string]: string };
  env: any;
  dbi_blocks: any;
  dbi_heights: any;

  constructor({
    pluginDir,
    readOnly = true,
  }: {
    pluginDir: string;
    readOnly?: boolean;
  }) {
    if (!pluginDir) throw Error(`Missing pluginDir`);
    fs.mkdirSync(pluginDir, { recursive: true });

    this.processedBlocks = {};
    this.env = new lmdb.Env();
    this.env.open({
      path: pluginDir,
      mapSize: 1 * 1024 * 1024 * 1024, // 1GB node info max
      maxDbs: 3,
      maxReaders: 64,
      readOnly,
    });
    this.dbi_blocks = this.env.openDbi({
      name: "block_info",
      create: !readOnly,
      keyIsBuffer: true,
    });
    this.dbi_heights = this.env.openDbi({
      name: "block_heights",
      create: !readOnly,
      keyIsUint32: true,
    });
  }

  close() {
    try {
      this.dbi_blocks.close();
    } catch (err) {}
    try {
      this.dbi_heights.close();
    } catch (err) {}
    try {
      this.env.close();
    } catch (err) {}
  }

  markBlockProcessed({
    blockHash,
    height,
    matches,
    errors,
    txCount,
    size,
    timer,
  }: PluginOptions) {
    if (!Buffer.isBuffer(blockHash)) blockHash = Buffer.from(blockHash, "hex");
    const date = +new Date();
    const value = Buffer.from(
      JSON.stringify({ matches, errors, txCount, size, date, timer })
    );
    const txn = this.env.beginTxn({ readOnly: false });
    txn.putBinary(this.dbi_heights, height, blockHash);
    txn.putBinary(this.dbi_blocks, blockHash, value);
    txn.commit();
    this.processedBlocks[`${height}`] = blockHash.toString("hex");
  }

  async batchBlocksProcessed(array: PluginOptions[]) {
    if (array.length === 0) return;
    const heights: any = [];
    const blocks: any = [];
    const date = +new Date();
    for (const obj of array) {
      const { blockHash, height, matches, errors, txCount, size, timer } = obj;
      const value = Buffer.from(
        JSON.stringify({ matches, errors, txCount, size, date, timer })
      );
      blocks.push([this.dbi_blocks, blockHash, value]);
      heights.push([this.dbi_heights, height, blockHash]);
    }
    await new Promise((resolve, reject) => {
      this.env.batchWrite(blocks, {}, (err: any, results: number[]) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    await new Promise((resolve, reject) => {
      this.env.batchWrite(
        heights,
        { keyIsUint32: true },
        (err: any, results: number[]) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  loadBlocks() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_heights);
    for (
      let height = cursor.goToFirst();
      height !== null;
      height = cursor.goToNext()
    ) {
      const hash = cursor.getCurrentBinary();
      if (hash) this.processedBlocks[`${height}`] = hash.toString("hex");
    }
    cursor.close();
    txn.commit();
  }

  isProcessed(height: number) {
    return !!this.processedBlocks[`${height}`];
  }
  blocksProcessed() {
    return Object.keys(this.processedBlocks).length;
  }
  getHash(height: number) {
    return this.processedBlocks[`${height}`];
  }

  getBlockInfo(blockHash: string | Buffer) {
    if (!Buffer.isBuffer(blockHash)) blockHash = Buffer.from(blockHash, "hex");
    const txn = this.env.beginTxn({ readOnly: true });
    const value = txn.getBinary(this.dbi_blocks, blockHash);
    txn.commit();
    if (!value) throw Error(`Missing block info`);
    return JSON.parse(value.toString());
  }

  getBlockHash(height: number) {
    const txn = this.env.beginTxn({ readOnly: true });
    const value = txn.getBinary(this.dbi_heights, height);
    txn.commit();
    if (!value) throw Error(`Missing block height`);
    return value.toString("hex");
  }

  delBlocks(from: number, to: number) {
    const txn = this.env.beginTxn({ readOnly: false });
    for (let height = from; height <= to; height++) {
      txn.del(this.dbi_heights, height);
      delete this.processedBlocks[`${height}`];
    }
    txn.commit();
  }
}
