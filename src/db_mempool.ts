import * as bsv from "bsv-minimal";
import lmdb from "node-lmdb";
import fs from "fs";

export default class DbMempool {
  pruneAfter: number;
  env: any;
  dbi_txs: any;
  dbi_tx_times: any;

  constructor({
    mempoolDir,
    pruneAfter = 1000 * 60 * 60 * 12, // After 12 hours
    readOnly = true,
  }: {
    mempoolDir: string;
    pruneAfter?: number;
    readOnly?: boolean;
  }) {
    if (!mempoolDir) throw Error(`Missing mempoolDir`);
    fs.mkdirSync(mempoolDir, { recursive: true });
    this.pruneAfter = pruneAfter;

    this.env = new lmdb.Env();
    this.env.open({
      path: mempoolDir,
      mapSize: 1 * 1024 * 1024 * 1024 * 1024, // 1TB mempool max
      maxDbs: 3,
      maxReaders: 64,
      readOnly,
    });
    this.dbi_txs = this.env.openDbi({
      name: "txs",
      create: !readOnly,
      keyIsBuffer: true,
    });
    this.dbi_tx_times = this.env.openDbi({
      name: "tx_times",
      create: !readOnly,
      keyIsBuffer: true,
    });
  }

  close() {
    try {
      this.dbi_txs.close();
    } catch (err) {}
    try {
      this.dbi_tx_times.close();
    } catch (err) {}
    try {
      this.env.close();
    } catch (err) {}
  }

  saveTxs(
    txsArray: bsv.Transaction[]
  ): Promise<{ txids: Buffer[]; size: number }> {
    return new Promise((resolve, reject) => {
      const txids: Buffer[] = [];
      let size = 0;
      if (txsArray.length === 0) return resolve({ txids, size });
      const operations: any = [];
      const bw = new bsv.utils.BufferWriter();
      const date = Math.round(+new Date() / 1000);
      bw.writeUInt32LE(date);
      const time = bw.toBuffer();
      txsArray.map((tx) => {
        const txid = tx.getHash();
        size += tx.toBuffer().length;
        operations.push([this.dbi_txs, txid, tx.toBuffer(), null]);
        operations.push([this.dbi_tx_times, txid, time, null]);
      });
      this.env.batchWrite(operations, {}, (err: any, results: number[]) => {
        if (err) return reject(err);
        txsArray.map(
          (tx, i) => results[i * 2] === 0 && txids.push(tx.getHash())
        );
        resolve({ txids, size });
      });
    });
  }

  saveTimes(txidArr: Buffer[]): Promise<Buffer[]> {
    return new Promise((resolve, reject) => {
      const txids: Buffer[] = [];
      if (txidArr.length === 0) return resolve(txids);
      const operations: any = [];
      const bw = new bsv.utils.BufferWriter();
      const date = Math.round(+new Date() / 1000);
      bw.writeUInt32LE(date);
      const time = bw.toBuffer();
      txidArr.map((txid) => {
        operations.push([this.dbi_tx_times, txid, time, null]);
      });
      this.env.batchWrite(operations, {}, (err: any, results: number[]) => {
        if (err) return reject(err);
        txidArr.map((txid, i) => results[i] === 0 && txids.push(txid));
        resolve(txids);
      });
    });
  }

  delTxs(txidArr: Buffer[]): Promise<Buffer[]> {
    return new Promise((resolve, reject) => {
      const txids: Buffer[] = [];
      if (txidArr.length === 0) return resolve(txids);
      const operations: any = [];
      txidArr.map((txid) => {
        operations.push([this.dbi_txs, txid]);
        operations.push([this.dbi_tx_times, txid]);
      });
      this.env.batchWrite(operations, {}, (err: any, results: number[]) => {
        if (err) return reject(err);
        txidArr.map((txid, i) => results[i * 2] === 0 && txids.push(txid));
        resolve(txids);
      });
    });
  }

  getTxids({
    olderThan,
    newerThan,
  }: {
    olderThan?: number;
    newerThan?: number;
  }) {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_tx_times);
    const txids: Buffer[] = [];
    for (
      let txid = cursor.goToFirst();
      txid !== null;
      txid = cursor.goToNext()
    ) {
      if ((olderThan && olderThan >= 0) || (newerThan && newerThan >= 0)) {
        const buf = cursor.getCurrentBinary();
        if (buf) {
          const br = new bsv.utils.BufferReader(buf);
          const time = br.readUInt32LE() * 1000;
          if (
            (olderThan && olderThan > time) ||
            (newerThan && newerThan < time)
          ) {
            txids.push(Buffer.from(txid));
          }
        }
      } else {
        txids.push(Buffer.from(txid));
      }
    }
    cursor.close();
    txn.commit();
    return txids;
  }

  getTx(txid: string | Buffer, getTime = true) {
    if (typeof txid === "string") txid = Buffer.from(txid, "hex");
    const { txs, size, times } = this.getTxs([txid], getTime);
    const tx = txs[0];
    if (!tx) throw Error(`Not found`);
    const time = times[0];
    return { tx, time, size };
  }
  getTxs(txids?: Buffer[], getTime = false) {
    const txs = [];
    const times = [];
    let size = 0;
    const txn = this.env.beginTxn({ readOnly: true });
    if (txids) {
      for (let txid of txids) {
        const buf = txn.getBinary(this.dbi_txs, txid);
        if (buf) {
          const tx = bsv.Transaction.fromBuffer(buf);
          txs.push(tx);
          size += buf.length;
        }
      }
    } else {
      const cursor = new lmdb.Cursor(txn, this.dbi_txs);
      for (
        let txid = cursor.goToFirst();
        txid !== null;
        txid = cursor.goToNext()
      ) {
        const buf = cursor.getCurrentBinary();
        if (buf) {
          const tx = bsv.Transaction.fromBuffer(buf);
          txs.push(tx);
          size += buf.length;
        }
      }
      cursor.close();
    }
    if (getTime) {
      for (const tx of txs) {
        const buf = txn.getBinary(this.dbi_tx_times, tx.getHash());
        if (buf) {
          const br = new bsv.utils.BufferReader(buf);
          const time = br.readUInt32LE() * 1000;
          times.push(time);
        } else {
          times.push(null);
        }
      }
    }
    txn.commit();
    return { txs, size, times };
  }

  pruneTxs(olderThan?: number) {
    if (!olderThan) olderThan = +new Date() - this.pruneAfter;
    const txids = this.getTxids({ olderThan });
    if (txids.length > 0) {
      return this.delTxs(txids);
    } else {
      return txids;
    }
  }
}
