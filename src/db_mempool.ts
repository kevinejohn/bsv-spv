import * as bsv from "bsv-minimal";
import * as lmdb from "lmdb";
import fs from "fs";

export default class DbMempool {
  pruneAfter: number;
  dbi_root: lmdb.RootDatabase;
  dbi_txs: lmdb.Database<Buffer>;
  dbi_tx_times: lmdb.Database<Buffer>;
  mempoolDir: string;

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
    this.mempoolDir = mempoolDir;
    this.pruneAfter = pruneAfter;

    this.dbi_root = lmdb.open({ path: mempoolDir, readOnly });
    this.dbi_txs = this.dbi_root.openDB({
      name: "txs",
      encoding: "binary",
      keyEncoding: "binary",
    });
    this.dbi_tx_times = this.dbi_root.openDB({
      name: "tx_times",
      encoding: "binary",
      keyEncoding: "binary",
    });
  }

  async close() {
    try {
      await this.dbi_txs.close();
    } catch (err) {}
    try {
      await this.dbi_tx_times.close();
    } catch (err) {}
    try {
      await this.dbi_root.close();
    } catch (err) {}
  }

  async saveTxs(
    txsArray: bsv.Transaction[]
  ): Promise<{ txids: Buffer[]; size: number }> {
    const txids: Buffer[] = [];
    let size = 0;
    const bw = new bsv.utils.BufferWriter();
    const date = Math.round(+new Date() / 1000);
    bw.writeUInt32LE(date);
    const time = bw.toBuffer();
    for (const tx of txsArray) {
      const txid = tx.getHash();
      txids.push(txid);
      size += tx.toBuffer().length;

      this.dbi_txs.put(txid, tx.toBuffer());
      if (!this.dbi_tx_times.get(txid)) this.dbi_tx_times.put(txid, time);
    }
    return { txids, size };
  }

  saveTimes(txidArr: Buffer[]): Buffer[] {
    const txids: Buffer[] = [];
    const bw = new bsv.utils.BufferWriter();
    const date = Math.round(+new Date() / 1000);
    bw.writeUInt32LE(date);
    const time = bw.toBuffer();
    for (const txid of txidArr) {
      if (!this.dbi_tx_times.get(txid)) {
        this.dbi_tx_times.put(txid, time);
        txids.push(txid);
      }
    }
    return txids;
  }

  delTxs(txidArr: Buffer[]): Buffer[] {
    for (const txid of txidArr) {
      this.dbi_txs.remove(txid);
      this.dbi_tx_times.remove(txid);
    }
    return txidArr;
  }

  getTxids({
    olderThan,
    newerThan,
  }: {
    olderThan?: number;
    newerThan?: number;
  }) {
    const txids: Buffer[] = [];
    for (const { key: txid, value: buf } of this.dbi_tx_times.getRange()) {
      if (!Buffer.isBuffer(txid) || !Buffer.isBuffer(buf)) continue;

      if ((olderThan && olderThan >= 0) || (newerThan && newerThan >= 0)) {
        const br = new bsv.utils.BufferReader(buf);
        const time = br.readUInt32LE() * 1000;
        if (
          (olderThan && olderThan > time) ||
          (newerThan && newerThan < time)
        ) {
          txids.push(Buffer.from(txid));
        }
      } else {
        txids.push(Buffer.from(txid));
      }
    }
    return txids;
  }

  getTx(txid: string, getTime = true) {
    const { txs, size, times } = this.getTxs([txid], getTime);
    const tx = txs[0];
    if (!tx) throw Error(`Not found`);
    const time = times[0];
    return { tx, time, size };
  }
  getTxs(
    txids?: string[] | Buffer[],
    getTime = false
  ): { txs: bsv.Transaction[]; size: number; times: (number | null)[] } {
    const txs = [];
    const times = [];
    let size = 0;

    if (txids) {
      for (let txid of txids) {
        const key = Buffer.isBuffer(txid) ? txid : Buffer.from(txid, "hex");
        const buf = this.dbi_txs.getBinary(key);
        if (buf) {
          const tx = bsv.Transaction.fromBuffer(buf);
          txs.push(tx);
          size += buf.length;
        }
      }
    } else {
      for (const { key: txid, value: buf } of this.dbi_txs.getRange()) {
        if (!Buffer.isBuffer(txid) || !Buffer.isBuffer(buf)) continue;
        const tx = bsv.Transaction.fromBuffer(buf);
        txs.push(tx);
        size += buf.length;
      }
    }
    if (getTime) {
      for (const tx of txs) {
        const buf = this.dbi_tx_times.getBinary(tx.getHash());
        if (buf) {
          const br = new bsv.utils.BufferReader(buf);
          const time = br.readUInt32LE() * 1000;
          times.push(time);
        } else {
          times.push(null);
        }
      }
    }
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
