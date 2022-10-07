import * as bsv from "bsv-minimal";
import levelup, { LevelUp } from "levelup";
import { AbstractBatch } from "abstract-leveldown";
import rocksdb from "rocksdb";
import fs from "fs";

export default class DbMempool {
  db: LevelUp;
  txs: { [key: string]: Buffer };
  batch: AbstractBatch[];
  intervalBatch?: NodeJS.Timer;
  intervalPrune?: NodeJS.Timer;
  pruneAfter: number;

  constructor({
    mempoolDir,
    pruneAfter = 1000 * 60 * 60 * 4, // After 4 hours
    readOnly = false,
  }: {
    mempoolDir: string;
    pruneAfter?: number;
    readOnly?: boolean;
  }) {
    if (!mempoolDir) throw Error(`Missing mempoolDir`);
    fs.mkdirSync(mempoolDir, { recursive: true });
    this.pruneAfter = pruneAfter;
    this.batch = [];
    this.db = levelup(rocksdb(mempoolDir), { readOnly });
    this.txs = {};
  }

  close() {
    try {
      this.db.close();
    } catch (err) {}
  }

  saveTx(tx: bsv.Transaction) {
    this.txs[tx.getTxid()] = tx.toBuffer();
    const bw = new bsv.utils.BufferWriter();
    bw.writeVarintNum(+new Date());
    bw.writeVarLengthBuffer(tx.toBuffer());
    this.batch.push({
      type: "put",
      key: tx.getHash(),
      value: bw.toBuffer(),
    });
    if (this.batch.length > 10000) this.saveTxs();
    if (!this.intervalBatch)
      this.intervalBatch = setInterval(() => this.saveTxs(), 1000 * 10);
    if (!this.intervalPrune)
      this.intervalPrune = setInterval(() => this.pruneTxs(), 1000 * 60 * 20);
  }

  saveTxs() {
    return new Promise((resolve, reject) => {
      if (this.batch.length === 0) return resolve(null);
      const operations = this.batch;
      this.batch = [];
      this.txs = {};
      this.db.batch(operations, (err: any) => {
        if (err) return reject(err);
        resolve(null);
      });
    });
  }

  delTxs(txids: Buffer[]) {
    return new Promise((resolve, reject) => {
      if (txids.length === 0) return resolve(null);
      const operations: any = [];
      txids.map((txid) => operations.push({ type: "del", key: txid }));
      this.db.batch(operations, (err: any) => {
        if (err) return reject(err);
        resolve(null);
      });
    });
  }

  getTxids({
    olderThan,
    newerThan,
  }: {
    olderThan?: number;
    newerThan?: number;
  }): Promise<Buffer[]> {
    return new Promise((resolve, reject) => {
      try {
        const txids: Buffer[] = [];
        const stream = this.db.createReadStream({ keys: true, values: true });
        stream.on("data", ({ key, value }: { key: Buffer; value: Buffer }) => {
          const br = new bsv.utils.BufferReader(value);
          const time = br.readVarintNum();
          if (olderThan && newerThan && time < olderThan && time > newerThan) {
            txids.push(key);
          } else if (olderThan && time < olderThan) {
            txids.push(key);
          } else if (newerThan && time > newerThan) {
            txids.push(key);
          } else {
            txids.push(key);
          }
        });
        stream.on("error", (err: any) => reject(err));
        stream.on("end", () => resolve(txids));
      } catch (err) {
        reject(err);
      }
    });
  }

  async getTx(txid: string | Buffer) {
    if (this.txs[txid.toString("hex")]) {
      const buf = this.txs[txid.toString("hex")];
      const tx = bsv.Transaction.fromBuffer(buf);
      const size = tx.length;
      const time = +new Date();
      return { tx, size, time };
    }
    if (!Buffer.isBuffer(txid)) txid = Buffer.from(txid, "hex");
    const buf = await this.db.get(txid);
    if (!buf) throw Error(`Tx not found`);
    const br = new bsv.utils.BufferReader(buf);
    const time = br.readVarintNum();
    const txBuf = br.readVarLengthBuffer();
    const tx = bsv.Transaction.fromBuffer(txBuf);
    const size = tx.length;
    return { tx, time, size };
  }

  async pruneTxs(olderThan?: number) {
    if (!olderThan) olderThan = +new Date() - this.pruneAfter;
    const txids = await this.getTxids({ olderThan });
    await this.delTxs(txids);
  }
}
