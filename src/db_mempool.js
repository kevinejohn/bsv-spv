const lmdb = require("node-lmdb");
const bsv = require("bsv-minimal");
const fs = require("fs");

class DbMempool {
  constructor({ mempoolDir, readOnly = false }) {
    if (!mempoolDir) throw Error(`Missing mempoolDir`);
    fs.mkdirSync(mempoolDir, { recursive: true });

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

  saveTxs(txsArray) {
    return new Promise((resolve, reject) => {
      if (txsArray.length === 0) return resolve({ hashes: [] });
      const operations = [];
      const bw = new bsv.utils.BufferWriter();
      const date = Math.round(+new Date() / 1000);
      bw.writeUInt32LE(date);
      const time = bw.toBuffer();
      txsArray.map((tx) => {
        const hash = tx.getHash();
        operations.push([this.dbi_txs, hash, tx.toBuffer(), null]);
        operations.push([this.dbi_tx_times, hash, time, null]);
      });
      this.env.batchWrite(operations, {}, (err, results) => {
        if (err) return reject(err);
        const hashes = [];
        txsArray.map(
          (tx, i) => results[i * 2] === 0 && hashes.push(tx.getHash())
        );
        resolve({ hashes });
      });
    });
  }

  saveTimes(txHashes) {
    return new Promise((resolve, reject) => {
      const hashes = [];
      if (txHashes.length === 0) return resolve({ hashes });
      const operations = [];
      const bw = new bsv.utils.BufferWriter();
      const date = Math.round(+new Date() / 1000);
      bw.writeUInt32LE(date);
      const time = bw.toBuffer();
      txHashes.map((hash) => {
        operations.push([this.dbi_tx_times, hash, time, null]);
      });
      this.env.batchWrite(operations, {}, (err, results) => {
        if (err) return reject(err);
        txHashes.map((hash, i) => results[i] === 0 && hashes.push(hash));
        resolve({ hashes });
      });
    });
  }

  delTxs(txHashes) {
    return new Promise((resolve, reject) => {
      const hashes = [];
      if (txHashes.length === 0) return resolve({ hashes });
      const operations = [];
      txHashes.map((hash) => {
        operations.push([this.dbi_txs, hash]);
        operations.push([this.dbi_tx_times, hash]);
      });
      this.env.batchWrite(operations, {}, (err, results) => {
        if (err) return reject(err);
        txHashes.map((hash, i) => results[i * 2] === 0 && hashes.push(hash));
        resolve({ hashes });
      });
    });
  }

  getTx(hash, getTime = false) {
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, "hex");
    let tx, time;
    const txn = this.env.beginTxn({ readOnly: true });
    const bufTx = txn.getBinary(this.dbi_txs, hash);
    if (!bufTx) throw Error(`Tx not found`);
    tx = bsv.Transaction.fromBuffer(bufTx);
    if (getTime) {
      const buf = txn.getBinary(this.dbi_tx_times, hash);
      const br = new bsv.utils.BufferReader(buf);
      time = br.readUInt32LE() * 1000;
    }
    txn.commit();
    return { tx, time };
  }

  getTxHashes(opts = {}) {
    const { olderThan, newerThan } = opts;
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_tx_times);
    const txHashes = [];
    for (
      let hash = cursor.goToFirst();
      hash !== null;
      hash = cursor.goToNext()
    ) {
      if (olderThan >= 0 || newerThan >= 0) {
        const buf = cursor.getCurrentBinary();
        const br = new bsv.utils.BufferReader(buf);
        const time = br.readUInt32LE() * 1000;
        if (olderThan > time || newerThan < time) {
          txHashes.push(hash);
        }
      } else {
        txHashes.push(hash);
      }
    }
    cursor.close();
    txn.commit();
    return txHashes;
  }

  pruneTxs(olderThan) {
    if (!(olderThan >= 0)) olderThan = +new Date() - 1000 * 60 * 60 * 12; // 12 hours ago
    const hashes = this.getTxHashes({ olderThan });
    if (hashes.length > 0) {
      return this.delTxs(hashes);
    } else {
      return { hashes };
    }
  }
}

module.exports = DbMempool;
