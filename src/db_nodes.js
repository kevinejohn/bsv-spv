const lmdb = require("node-lmdb");
const bsv = require("bsv-minimal");
const fs = require("fs");

class DbNodes {
  constructor({ nodesDir, readOnly = false }) {
    if (!nodesDir) throw Error(`Missing nodesDir`);
    fs.mkdirSync(mempoolDir, { recursive: true });

    this.env = new lmdb.Env();
    this.env.open({
      path: mempoolDir,
      mapSize: 1 * 1024 * 1024 * 1024, // 1GB node info max
      maxDbs: 3,
      maxReaders: 64,
      readOnly,
    });
    this.dbi_nodes = this.env.openDbi({
      name: "nodes",
      create: !readOnly,
      keyIsString: true,
    });
  }

  close() {
    try {
      this.dbi_nodes.close();
    } catch (err) {}
    try {
      this.env.close();
    } catch (err) {}
  }
}

module.exports = DbNodes;
