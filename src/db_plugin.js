const lmdb = require("node-lmdb");
const fs = require("fs");

class DbPlugin {
  constructor({ pluginDir, readOnly = true }) {
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
  }) {
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

  loadBlocks() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_heights);
    for (
      let height = cursor.goToFirst();
      height !== null;
      height = cursor.goToNext()
    ) {
      const hash = txn.getBinary(this.dbi_heights, height).toString("hex");
      this.processedBlocks[`${height}`] = hash;
    }
    cursor.close();
    txn.commit();
  }

  isProcessed(height) {
    return !!this.processedBlocks[`${height}`];
  }
  blocksProcessed() {
    return Object.keys(this.processedBlocks).length;
  }
  getHash(height) {
    return this.processedBlocks[`${height}`];
  }

  getBlockInfo(blockHash) {
    if (!Buffer.isBuffer(blockHash)) blockHash = Buffer.from(blockHash, "hex");
    const txn = this.env.beginTxn({ readOnly: true });
    const value = txn.getBinary(this.dbi_blocks, blockHash);
    txn.commit();
    if (!value) throw Error(`Missing block info`);
    return JSON.parse(value.toString());
  }

  getBlockHash(height) {
    const txn = this.env.beginTxn({ readOnly: true });
    const value = txn.getBinary(this.dbi_heights, height);
    txn.commit();
    if (!value) throw Error(`Missing block height`);
    return value.toString("hex");
  }

  delBlocks(from, to) {
    const txn = this.env.beginTxn({ readOnly: false });
    for (let height = from; height <= to; height++) {
      txn.del(this.dbi_heights, height);
      delete this.processedBlocks[`${height}`];
    }
    txn.commit();
    // return new Promise((resolve, reject) => {
    //   if (from === to) return resolve();
    //   const operations = [];
    //   for (let height = from; height <= to; height++) {
    //     operations.push([this.dbi_heights, height]);
    //   }
    //   this.env.batchWrite(operations, {}, (err, results) => {
    //     if (err) return reject(err);
    //     resolve();
    //   });
    // });
  }
}

module.exports = DbPlugin;
