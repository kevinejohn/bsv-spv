const lmdb = require("node-lmdb");
const bsv = require("bsv-minimal");
const Headers = require("bsv-headers");

class DbHeaders {
  constructor({ dataDir, invalidBlocks = [] }) {
    if (!dataDir) throw Error(`Missing dataDir`);

    this.env = new lmdb.Env();
    this.env.open({
      path: dataDir,
      mapSize: 1 * 1024 * 1024 * 1024,
      maxDbs: 1,
    });
    this.dbi_headers = this.env.openDbi({
      name: "headers",
      create: true,
      keyIsString: true,
    });
    this.headers = new Headers({ invalidBlocks });
    this.loadHeaders();
  }

  close() {
    try {
      this.dbi_headers.close();
    } catch (err) {}
    try {
      this.env.close();
    } catch (err) {}
  }

  saveHeaders(headers) {
    return new Promise((resolve, reject) => {
      if (headers.length === 0) return resolve();
      const operations = [];
      headers.map((header) => {
        this.headers.addHeader({ header });
        operations.push([
          this.dbi_headers,
          header.getHash().toString("hex"),
          header.toBuffer(),
        ]);
      });
      this.env.batchWrite(operations, {}, (err, result) => {
        if (err) return reject(err);
        this.headers.process();
        resolve(result);
      });
    });
  }

  // saveHeaders(headers) {
  //   let newHeaders = 0;
  //   const txn = this.env.beginTxn();
  //   for (const header of headers) {
  //     this.headers.addHeader({ header });
  //     const key = header.getHash().toString("hex");
  //     const buf = txn.getBinary(this.dbi_headers, key);
  //     if (!buf) {
  //       newHeaders++;
  //       const value = header.toBuffer();
  //       txn.putBinary(this.dbi_headers, key, value);
  //     }
  //   }
  //   txn.commit();
  //   this.headers.process();
  //   return newHeaders;
  // }

  getHeader(hash) {
    const txn = this.env.beginTxn({ readOnly: true });
    const buf = txn.getBinary(this.dbi_headers, hash.toString("hex"));
    txn.commit();
    const header = bsv.Header.fromBuffer(buf);
    return header;
  }

  loadHeaders() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_headers);
    for (let key = cursor.goToFirst(); key !== null; key = cursor.goToNext()) {
      const buf = cursor.getCurrentBinary();
      this.headers.addHeader({ buf, hash: key });
    }
    cursor.close();
    txn.commit();
    this.headers.process();
  }

  getHash(height) {
    return this.headers.getHash(height);
  }
  getHeight(hash = false) {
    return this.headers.getHeight(hash);
  }
  getTip() {
    return this.headers.getTip();
  }
  getFromHeaderArray() {
    return this.headers.getFromHeaderArray();
  }
}

module.exports = DbHeaders;
