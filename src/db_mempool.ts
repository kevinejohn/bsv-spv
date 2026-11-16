import * as bsv from "bsv-minimal";
import * as lmdb from "lmdb";
import fs from "fs";
import path from "path";

/**
 * Legacy RocksDB artifacts left behind by the previous backend.
 * The mempool database is a disposable cache, so these can be discarded
 * once the LMDB store has been initialised.
 */
const LEGACY_ROCKSDB_FILE =
  /^(CURRENT|LOCK|LOG|LOG\.old\..*|IDENTITY|MANIFEST-\d+|OPTIONS-\d+|\d+\.(log|sst|ldb))$/;

function removeLegacyRocksdbFiles(dir: string) {
  let removed = 0;
  for (const entry of fs.readdirSync(dir)) {
    if (!LEGACY_ROCKSDB_FILE.test(entry)) continue;
    try {
      fs.rmSync(path.join(dir, entry), { force: true });
      removed++;
    } catch (err) {}
  }
  return removed;
}

export default class DbMempool {
  dbi_root: lmdb.RootDatabase;
  dbi_txs: lmdb.Database<Buffer, Buffer>;
  txs: { [key: string]: Buffer };
  batch: { type: "put"; key: Buffer; value: Buffer }[];
  intervalBatch?: NodeJS.Timeout;
  intervalPrune?: NodeJS.Timeout;
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

    if (!readOnly && !fs.existsSync(path.join(mempoolDir, "data.mdb"))) {
      const removed = removeLegacyRocksdbFiles(mempoolDir);
      if (removed > 0)
        console.log(
          `Discarded ${removed} legacy RocksDB file(s) from ${mempoolDir}`
        );
    }

    this.dbi_root = lmdb.open({ path: mempoolDir, noSubdir: false, readOnly });
    this.dbi_txs = this.dbi_root.openDB({
      name: "txs",
      keyEncoding: "binary",
      encoding: "binary",
    });
    this.txs = {};
  }

  async close() {
    clearInterval(this.intervalBatch);
    clearInterval(this.intervalPrune);
    this.intervalBatch = undefined;
    this.intervalPrune = undefined;
    try {
      await this.saveTxs();
    } catch (err) {}
    try {
      await this.dbi_txs.flushed;
    } catch (err) {}
    try {
      await this.dbi_txs.close();
    } catch (err) {}
    try {
      await this.dbi_root.close();
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

  async saveTxs() {
    if (this.batch.length === 0) return;
    const operations = this.batch;
    this.batch = [];
    this.dbi_txs.transactionSync(() => {
      for (const { key, value } of operations) this.dbi_txs.put(key, value);
    });
    for (const { key } of operations) delete this.txs[key.toString("hex")];
  }

  async delTxs(txids: Buffer[]) {
    if (txids.length === 0) return;
    this.dbi_txs.transactionSync(() => {
      for (const txid of txids) this.dbi_txs.remove(txid);
    });
  }

  getTxids({
    olderThan,
    newerThan,
  }: {
    olderThan?: number;
    newerThan?: number;
  }): Promise<Buffer[]> {
    try {
      const txids: Buffer[] = [];
      const hasOlderThan = typeof olderThan === "number";
      const hasNewerThan = typeof newerThan === "number";
      for (const { key, value } of this.dbi_txs.getRange()) {
        if (!Buffer.isBuffer(key) || !Buffer.isBuffer(value)) continue;
        const br = new bsv.utils.BufferReader(value);
        const time = br.readVarintNum();
        if (hasOlderThan && hasNewerThan) {
          if (time < olderThan! && time > newerThan!) txids.push(key);
        } else if (hasOlderThan) {
          if (time < olderThan!) txids.push(key);
        } else if (hasNewerThan) {
          if (time > newerThan!) txids.push(key);
        } else {
          txids.push(key);
        }
      }
      return Promise.resolve(txids);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getTx(txid: string | Buffer) {
    if (this.txs[txid.toString("hex")]) {
      const buf = this.txs[txid.toString("hex")];
      const tx = bsv.Transaction.fromBuffer(buf);
      const size = tx.length;
      const time = Math.floor(+new Date() / 1000);
      return { tx, size, time };
    }
    if (!Buffer.isBuffer(txid)) txid = Buffer.from(txid, "hex");
    const buf = this.dbi_txs.get(txid);
    if (!buf) throw Error(`Tx not found`);
    const br = new bsv.utils.BufferReader(buf);
    const time = Math.floor(br.readVarintNum() / 1000);
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
