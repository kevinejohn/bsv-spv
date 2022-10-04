import * as lmdb from "lmdb";
import fs from "fs";

export interface ListenerOptions {
  blockHash: string | Buffer;
  height: number;
  matches?: number;
  errors?: number;
  txCount?: number;
  size?: number;
  timer?: number;
}

export default class DbListener {
  dbi_root: lmdb.RootDatabase;
  dbi_blocks: lmdb.Database<Buffer>;
  dbi_heights: lmdb.Database<Buffer>;
  listenerDir: string;

  constructor({
    listenerDir,
    readOnly = false,
  }: {
    listenerDir: string;
    readOnly?: boolean;
  }) {
    if (!listenerDir) throw Error(`Missing listenerDir`);
    fs.mkdirSync(listenerDir, { recursive: true });
    this.listenerDir = listenerDir;

    this.dbi_root = lmdb.open({ path: listenerDir, readOnly });
    this.dbi_blocks = this.dbi_root.openDB({
      name: "block_info",
      keyEncoding: "binary",
    });
    this.dbi_heights = this.dbi_root.openDB({
      name: "block_heights",
      keyEncoding: "uint32",
    });
  }

  async close() {
    try {
      await this.dbi_blocks.close();
    } catch (err) {}
    try {
      await this.dbi_heights.close();
    } catch (err) {}
    try {
      await this.dbi_root.close();
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
  }: ListenerOptions) {
    if (!Buffer.isBuffer(blockHash)) blockHash = Buffer.from(blockHash, "hex");
    const date = +new Date();
    const value = Buffer.from(
      JSON.stringify({ matches, errors, txCount, size, date, timer })
    );
    this.dbi_heights.putSync(height, blockHash);
    this.dbi_blocks.putSync(blockHash, value);
  }

  batchBlocksProcessed(array: ListenerOptions[]): Promise<boolean> {
    const date = +new Date();
    for (const obj of array) {
      let { blockHash, height, matches, errors, txCount, size, timer } = obj;
      const value = Buffer.from(
        JSON.stringify({ matches, errors, txCount, size, date, timer })
      );
      if (!Buffer.isBuffer(blockHash))
        blockHash = Buffer.from(blockHash, "hex");
      this.dbi_heights.put(height, blockHash);
      this.dbi_blocks.put(blockHash, value);
    }
    return this.dbi_root.flushed;
  }

  isProcessed(height: number): boolean {
    return this.dbi_heights.doesExist(height);
  }
  blocksProcessed() {
    return this.dbi_heights.getCount();
  }
  getHash(height: number): string {
    const buf = this.dbi_heights.get(height);
    if (!Buffer.isBuffer(buf)) throw Error(`Missing height`);
    return buf.toString("hex");
  }

  getBlockInfo(blockHash: string | Buffer) {
    if (!Buffer.isBuffer(blockHash)) blockHash = Buffer.from(blockHash, "hex");
    const value = this.dbi_blocks.get(blockHash);
    if (!value) throw Error(`Missing block info`);
    return JSON.parse(value.toString());
  }

  getBlockHash(height: number) {
    const value = this.dbi_heights.get(height);
    if (!Buffer.isBuffer(value)) throw Error(`Missing block height`);
    return value.toString("hex");
  }

  delBlocks(from: number, to: number) {
    for (let height = from; height <= to; height++) {
      this.dbi_heights.remove(height);
    }
    return this.dbi_root.flushed;
  }
}
