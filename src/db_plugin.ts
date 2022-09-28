import lmdb from "node-lmdb";
import fs from "fs";
import * as bsv from "bsv-minimal";

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
  dbi_blocks: lmdb.Dbi;
  dbi_heights: lmdb.Dbi;

  constructor({ pluginDir }: { pluginDir: string }) {
    if (!pluginDir) throw Error(`Missing pluginDir`);
    fs.mkdirSync(pluginDir, { recursive: true });

    this.processedBlocks = {};
    this.env = new lmdb.Env();
    this.env.open({
      path: pluginDir,
      mapSize: 1 * 1024 * 1024 * 1024, // 1GB node info max
      maxDbs: 3,
    });
    this.dbi_blocks = this.env.openDbi({
      name: "block_info",
      create: true,
      keyIsBuffer: true,
    });
    this.dbi_heights = this.env.openDbi({
      name: "block_heights",
      create: true,
      keyIsBuffer: true,
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
    const bw = new bsv.utils.BufferWriter();
    bw.writeUInt32LE(height);
    const key = bw.toBuffer();
    const txn = this.env.beginTxn({ readOnly: false });
    txn.putBinary(this.dbi_heights, key, blockHash, { keyIsBuffer: true });
    txn.putBinary(this.dbi_blocks, blockHash, value, { keyIsBuffer: true });
    txn.commit();
    this.processedBlocks[`${height}`] = blockHash.toString("hex");
  }

  async batchBlocksProcessed(array: PluginOptions[]): Promise<null> {
    return new Promise((resolve, reject) => {
      try {
        if (array.length === 0) return resolve(null);
        const operations: any = [];
        const date = +new Date();
        for (const obj of array) {
          const { blockHash, height, matches, errors, txCount, size, timer } =
            obj;
          const bw = new bsv.utils.BufferWriter();
          bw.writeUInt32LE(height);
          const key = bw.toBuffer();
          const value = Buffer.from(
            JSON.stringify({ matches, errors, txCount, size, date, timer })
          );
          operations.push([this.dbi_blocks, blockHash, value]);
          operations.push([this.dbi_heights, key, blockHash]);
        }

        this.env.batchWrite(
          operations,
          { keyIsBuffer: true },
          (err: any, results: number[]) => {
            if (err) return reject(err);
            resolve(null);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  loadBlocks() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor: lmdb.Cursor<Buffer> = new lmdb.Cursor(txn, this.dbi_heights, {
      keyIsBuffer: true,
    });
    for (let key = cursor.goToFirst(); key !== null; key = cursor.goToNext()) {
      const br = new bsv.utils.BufferReader(key);
      const height = br.readUInt32LE();
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
    const value = txn.getBinary(this.dbi_blocks, blockHash, {
      keyIsBuffer: true,
    });
    txn.commit();
    if (!value) throw Error(`Missing block info`);
    return JSON.parse(value.toString());
  }

  getBlockHash(height: number) {
    const bw = new bsv.utils.BufferWriter();
    bw.writeUInt32LE(height);
    const key = bw.toBuffer();
    const txn = this.env.beginTxn({ readOnly: true });
    const value = txn.getBinary(this.dbi_heights, key, { keyIsBuffer: true });
    txn.commit();
    if (!value) throw Error(`Missing block height`);
    return value.toString("hex");
  }

  delBlocks(from: number, to: number) {
    const txn = this.env.beginTxn({ readOnly: false });
    for (let height = from; height <= to; height++) {
      const bw = new bsv.utils.BufferWriter();
      bw.writeUInt32LE(height);
      try {
        txn.del(this.dbi_heights, bw.toBuffer(), { keyIsBuffer: true });
      } catch (err) {}
      delete this.processedBlocks[`${height}`];
    }
    txn.commit();
  }
}
