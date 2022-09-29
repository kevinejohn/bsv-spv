import * as bsv from "bsv-minimal";
import lmdb from "node-lmdb";
import Headers from "bsv-headers";
import fs from "fs";

export default class DbHeaders {
  headers: Headers;
  env: any;
  dbi_headers: lmdb.Dbi;
  headersDir: string;
  readOnly: boolean;
  keepOpen: boolean;
  dbIsOpen: boolean;

  constructor({
    headersDir,
    headers,
    readOnly = true,
    keepOpen = true,
  }: {
    headersDir: string;
    headers: any;
    readOnly?: boolean;
    keepOpen?: boolean;
  }) {
    if (!headersDir) throw Error(`Missing headersDir`);
    if (!headers) throw Error(`Missing headers param`);
    fs.mkdirSync(headersDir, { recursive: true });
    this.headers = headers;
    this.headersDir = headersDir;
    this.readOnly = readOnly;
    this.keepOpen = keepOpen;

    this.env = new lmdb.Env();
    this.env.open({
      path: this.headersDir,
      mapSize: 1 * 1024 * 1024 * 1024, // 1GB max
      maxDbs: 1,
      readOnly,
    });
    this.dbi_headers = this.env.openDbi({
      name: "headers",
      create: !readOnly,
      keyIsBuffer: true,
    });
    this.dbIsOpen = true;
    this.loadHeaders();
  }

  open() {
    if (this.dbIsOpen) return;
    this.env = new lmdb.Env();
    this.env.open({
      path: this.headersDir,
      mapSize: 1 * 1024 * 1024 * 1024, // 1GB max
      maxDbs: 1,
      readOnly: this.readOnly,
    });
    this.dbi_headers = this.env.openDbi({
      name: "headers",
      create: !this.readOnly,
      keyIsBuffer: true,
    });
    this.dbIsOpen = true;
  }

  close() {
    if (!this.dbIsOpen) return;
    try {
      this.dbi_headers.close();
    } catch (err) {}
    try {
      this.env.close();
    } catch (err) {}
    this.dbIsOpen = false;
  }

  saveHeaders(headerArray: bsv.Header[]): Promise<Buffer[]> {
    return new Promise((resolve, reject) => {
      try {
        if (this.readOnly) throw Error(`Headers opened as readOnly`);
        this.open();
        const hashes: Buffer[] = [];
        if (headerArray.length === 0) return resolve(hashes);
        const operations: any = [];
        headerArray.map((header) => {
          operations.push([
            this.dbi_headers,
            header.getHash(),
            header.toBuffer(),
            null,
          ]);
        });
        this.env.batchWrite(
          operations,
          { keyIsBuffer: true },
          (err: any, results: number[]) => {
            if (err) return reject(err);
            headerArray.map(
              (header, i) => results[i] === 0 && hashes.push(header.getHash())
            );
            if (!this.keepOpen) this.close();
            resolve(hashes);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  getHeader(hash: string | Buffer): bsv.Header {
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, "hex");
    if (hash.toString("hex") === this.headers.genesis) {
      return this.headers.genesisHeader;
    }
    this.open();
    const txn = this.env.beginTxn({ readOnly: true });
    const buf = txn.getBinary(this.dbi_headers, hash, { keyIsBuffer: true });
    txn.commit();
    if (!this.keepOpen) this.close();
    if (!buf) throw Error(`Missing header: ${hash.toString("hex")}`);
    const header = bsv.Header.fromBuffer(buf);
    return header;
  }

  loadHeaders() {
    this.open();
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor: lmdb.Cursor<Buffer> = new lmdb.Cursor(txn, this.dbi_headers, {
      keyIsBuffer: true,
    });
    for (
      let hash = cursor.goToFirst();
      hash !== null;
      hash = cursor.goToNext()
    ) {
      if (!this.headers.headers[hash.toString("hex")]) {
        const buf = cursor.getCurrentBinary();
        if (buf) this.headers.addHeader({ buf, hash });
      }
    }
    cursor.close();
    txn.commit();
    if (!this.keepOpen) this.close();
    this.headers.process();
  }
}
