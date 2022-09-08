const P2P = require("bsv-p2p");
const Headers = require("bsv-headers");
const DbHeaders = require("./db_headers");

class BsvSpv {
  constructor({ ticker, node, dataDir, invalidBlocks }) {
    this.peer = new P2P({ node, ticker });
    this.headers = new Headers({ invalidBlocks });
    this.db = new DbHeaders({ dataDir, headers: this.headers });
  }

  async syncHeaders(callback) {
    let from = this.headers.getFromHeaderArray();
    do {
      if (!this.peer || !this.peer.connected) throw Error(`Not connected`);
      let lastHash = Array.isArray(from) ? from[0] : from;
      const headers = await this.peer.getHeaders({ from });
      if (headers.length === 0) break;
      lastHash = headers[headers.length - 1].getHash();
      await this.db.saveHeaders(headers);
      if (typeof callback === "function") callback(headers.length);
      if (!lastHash || lastHash.toString("hex") === from.toString("hex")) break;
      from = headers[headers.length - 1].getHash();
    } while (true);
    if (typeof callback === "function") callback(0);

    if (!this.syncing) {
      this.syncing = true;
      this.peer.on("block_hashes", () => this.syncHeaders(callback));
    }
  }

  async connect() {
    await this.peer.connect();
  }
  getHeight(hash = false) {
    return this.headers.getHeight(hash);
  }
  getHash(height) {
    return this.headers.getHash(height);
  }
  getTip() {
    return this.headers.getTip();
  }
  getHeader({ height, hash }) {
    if (!hash) hash = this.headers.getHash(height);
    return this.db.getHeader(hash);
  }
}

module.exports = BsvSpv;
