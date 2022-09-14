const lmdb = require("node-lmdb");
const bsv = require("bsv-minimal");
const fs = require("fs");

class DbNodes {
  constructor({
    nodesDir,
    readOnly = false,
    blacklistTime = (+new Date() - 1000 * 60 * 60 * 4) / 1000, // 4 hours blacklisted
  }) {
    if (!nodesDir) throw Error(`Missing nodesDir`);
    fs.mkdirSync(nodesDir, { recursive: true });
    this.blacklistTime = blacklistTime;

    this.env = new lmdb.Env();
    this.env.open({
      path: nodesDir,
      mapSize: 1 * 1024 * 1024 * 1024, // 1GB node info max
      maxDbs: 5,
      maxReaders: 64,
      readOnly,
    });
    this.dbi_seen = this.env.openDbi({
      name: "peers_seen",
      create: !readOnly,
      keyIsString: true,
    });
    this.dbi_connected = this.env.openDbi({
      name: "peers_connected",
      create: !readOnly,
      keyIsString: true,
    });
    this.dbi_blacklisted = this.env.openDbi({
      name: "peers_blacklisted",
      create: !readOnly,
      keyIsString: true,
    });
  }

  close() {
    try {
      this.dbi_seen.close();
    } catch (err) {}
    try {
      this.dbi_connected.close();
    } catch (err) {}
    try {
      this.dbi_blacklisted.close();
    } catch (err) {}
    try {
      this.env.close();
    } catch (err) {}
  }

  saveSeenNodes(addrArray) {
    return new Promise((resolve, reject) => {
      const nodes = [];
      if (addrArray.length === 0) return resolve({ nodes });
      const operations = [];
      const bw = new bsv.utils.BufferWriter();
      const date = Math.round(+new Date() / 1000);
      bw.writeUInt32LE(date);
      const time = bw.toBuffer();
      const nodeArray = addrArray
        .filter(({ ipv4, port }) => ipv4 && port < 20000)
        .map(({ ipv4, port }) => `${ipv4}:${port}`);
      nodeArray.map((node) => {
        operations.push([this.dbi_seen, node, time, null]);
      });
      this.env.batchWrite(operations, {}, (err, results) => {
        if (err) return reject(err);
        nodeArray.map((node, i) => results[i] === 0 && nodes.push(node));
        resolve({ nodes });
      });
    });
  }

  connected(node) {
    const txn = this.env.beginTxn({ readOnly: false });
    let num = txn.getNumber(this.dbi_connected, node);
    num = num > 0 ? num + 1 : 1;
    txn.putNumber(this.dbi_connected, node, num);
    txn.commit();
  }

  blacklist(node) {
    const txn = this.env.beginTxn({ readOnly: false });
    const date = Math.round(+new Date() / 1000);
    txn.putNumber(this.dbi_blacklisted, node, date);
    txn.commit();
  }

  isBlacklisted(node) {
    // Default blacklist timeout is 4 hours
    const txn = this.env.beginTxn({ readOnly: false });
    const date = txn.getNumber(this.dbi_blacklisted, node);
    let blacklisted = false;
    if (date) {
      if (date > this.blacklistTime) {
        blacklisted = true;
      } else {
        txn.del(this.dbi_blacklisted, node);
      }
    }
    txn.commit();
    return blacklisted;
  }

  getBlacklistedNodes() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_blacklisted);
    const nodes = [];
    const expired = [];
    for (
      let node = cursor.goToFirst();
      node !== null;
      node = cursor.goToNext()
    ) {
      const date = cursor.getCurrentNumber();
      if (date) {
        if (date > this.blacklistTime) {
          nodes.push(node);
        } else {
          expired.push(this.dbi_blacklisted, node);
        }
      }
    }
    cursor.close();
    txn.commit();
    if (expired > 0) {
      this.env.batchWrite(expired, {}, (err, results) => {
        if (err) return reject(err);
        resolve();
      });
    }
    return nodes;
  }

  getConnectedNodes() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_connected);
    const nodes = [];
    for (
      let node = cursor.goToFirst();
      node !== null;
      node = cursor.goToNext()
    ) {
      nodes.push(node);
    }
    cursor.close();
    txn.commit();
    return nodes;
  }

  getSeenNodes() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_seen);
    const nodes = [];
    for (
      let node = cursor.goToFirst();
      node !== null;
      node = cursor.goToNext()
    ) {
      nodes.push(node);
    }
    cursor.close();
    txn.commit();
    return nodes;
  }
}

module.exports = DbNodes;
