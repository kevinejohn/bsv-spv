const P2P = require("bsv-p2p");
const DbHeaders = require("./db_headers");

class BsvSpv {
  constructor({ ticker, node, dataDir, invalidBlocks }) {
    this.peer = new P2P({ node, ticker });
    this.headers = new DbHeaders({ dataDir, invalidBlocks });
  }

  async connect() {
    await this.peer.connect();
  }

  async syncHeaders(callback) {
    let from = this.headers.getFromHeaderArray();
    do {
      if (!this.peer || !this.peer.connected) throw Error(`Not connect`);
      let lastHash = Array.isArray(from) ? from[0] : from;
      const headers = await this.peer.getHeaders({ from });
      if (headers.length === 0) break;
      lastHash = headers[headers.length - 1].getHash();
      await this.headers.saveHeaders(headers);
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

  getHeight(hash = false) {
    return this.headers.getHeight(hash);
  }
  getHash(height) {
    return this.headers.getHash(height);
  }
  getTip() {
    return this.headers.getTip();
  }
}

module.exports = BsvSpv;
