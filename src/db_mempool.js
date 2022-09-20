const lmdb = require("node-lmdb");
const bsv = require("bsv-minimal");
const fs = require("fs");

class DbMempool {
  constructor({
    mempoolDir,
    pruneAfter = 1000 * 60 * 60 * 12, // After 12 hours
    readOnly = true,
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

  saveTxs(txsArray) {
    return new Promise((resolve, reject) => {
      const hashes = [];
      let size = 0;
      if (txsArray.length === 0) return resolve({ hashes, size });
      const operations = [];
      const bw = new bsv.utils.BufferWriter();
      const date = Math.round(+new Date() / 1000);
      bw.writeUInt32LE(date);
      const time = bw.toBuffer();
      txsArray.map((tx) => {
        const hash = tx.getHash();
        size += tx.toBuffer().length;
        operations.push([this.dbi_txs, hash, tx.toBuffer(), null]);
        operations.push([this.dbi_tx_times, hash, time, null]);
      });
      this.env.batchWrite(operations, {}, (err, results) => {
        if (err) return reject(err);
        txsArray.map(
          (tx, i) => results[i * 2] === 0 && hashes.push(tx.getHash())
        );
        resolve({ hashes, size });
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

  getTx(hash, getTime = true) {
    const { txs, size, times } = this.getTxs([hash], getTime);
    const tx = txs[0];
    if (!tx) throw Error(`Not found`);
    const time = times[0];
    return { tx, time, size };
  }
  getTxs(txHashes = false, getTime = false) {
    const txs = [];
    const times = [];
    let size = 0;
    const txn = this.env.beginTxn({ readOnly: true });
    if (txHashes) {
      for (let hash of txHashes) {
        if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, "hex");
        const buf = txn.getBinary(this.dbi_txs, hash);
        if (buf) {
          const tx = bsv.Transaction.fromBuffer(buf);
          txs.push(tx);
          size += buf.length;
        }
      }
    } else {
      const cursor = new lmdb.Cursor(txn, this.dbi_txs);
      for (
        let hash = cursor.goToFirst();
        hash !== null;
        hash = cursor.goToNext()
      ) {
        const buf = cursor.getCurrentBinary();
        const tx = bsv.Transaction.fromBuffer(buf);
        txs.push(tx);
        size += buf.length;
      }
      cursor.close();
    }
    if (getTime) {
      for (const hash in txs) {
        const buf = txn.getBinary(this.dbi_tx_times, Buffer.from(hash, "hex"));
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

  pruneTxs(olderThan) {
    if (!(olderThan >= 0)) olderThan = +new Date() - this.pruneAfter;
    const hashes = this.getTxHashes({ olderThan });
    if (hashes.length > 0) {
      return this.delTxs(hashes);
    } else {
      return { hashes };
    }
  }
}

module.exports = DbMempool;
