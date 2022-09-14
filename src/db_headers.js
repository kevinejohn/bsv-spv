const lmdb = require("node-lmdb");
const bsv = require("bsv-minimal");
const fs = require("fs");

class DbHeaders {
  constructor({ headersDir, headers, readOnly = true }) {
    if (!headersDir) throw Error(`Missing headersDir`);
    if (!headers) throw Error(`Missing headers param`);
    fs.mkdirSync(headersDir, { recursive: true });
    this.headers = headers;

    this.env = new lmdb.Env();
    this.env.open({
      path: headersDir,
      mapSize: 1 * 1024 * 1024 * 1024,
      maxDbs: 1,
      maxReaders: 64,
      readOnly,
    });
    this.dbi_headers = this.env.openDbi({
      name: "headers",
      create: !readOnly,
      keyIsBuffer: true,
    });

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

  saveHeaders(headerArray) {
    return new Promise((resolve, reject) => {
      const hashes = [];
      if (headerArray.length === 0) return resolve({ hashes });
      const operations = [];
      headerArray.map((header) => {
        operations.push([
          this.dbi_headers,
          header.getHash(),
          header.toBuffer(),
          null,
        ]);
      });
      this.env.batchWrite(operations, {}, (err, results) => {
        if (err) return reject(err);
        headerArray.map(
          (header, i) => results[i] === 0 && hashes.push(header.getHash())
        );
        resolve({ hashes });
      });
    });
  }

  // saveHeaders(headerArray) {
  //   let newHeaders = 0;
  //   const txn = this.env.beginTxn();
  //   for (const header of headerArray) {
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
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, "hex");
    const txn = this.env.beginTxn({ readOnly: true });
    const buf = txn.getBinary(this.dbi_headers, hash);
    txn.commit();
    const header = bsv.Header.fromBuffer(buf);
    return header;
  }

  loadHeaders() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_headers);
    for (
      let hash = cursor.goToFirst();
      hash !== null;
      hash = cursor.goToNext()
    ) {
      const buf = cursor.getCurrentBinary();
      this.headers.addHeader({ buf, hash });
    }
    cursor.close();
    txn.commit();
    this.headers.process();
  }
}

module.exports = DbHeaders;
