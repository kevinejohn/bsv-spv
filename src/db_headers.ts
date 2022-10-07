import * as bsv from "bsv-minimal";
import * as lmdb from "lmdb";
import Headers from "bsv-headers";
import fs from "fs";

export default class DbHeaders {
  headers: Headers;
  env: any;
  dbi_root: lmdb.RootDatabase;
  dbi_headers: lmdb.Database<Buffer>;
  headersDir: string;

  constructor({
    headersDir,
    headers,
    readOnly = true,
  }: {
    headersDir: string;
    headers: any;
    readOnly?: boolean;
  }) {
    if (!headersDir) throw Error(`Missing headersDir`);
    if (!headers) throw Error(`Missing headers param`);
    fs.mkdirSync(headersDir, { recursive: true });
    this.headers = headers;
    this.headersDir = headersDir;

    this.dbi_root = lmdb.open({ path: headersDir, readOnly });
    this.dbi_headers = this.dbi_root.openDB({
      name: "headers",
      encoding: "binary",
      keyEncoding: "binary",
    });
    this.loadHeaders();
  }

  async close() {
    try {
      await this.dbi_headers.close();
    } catch (err) {}
    try {
      await this.dbi_root.close();
    } catch (err) {}
  }

  async saveHeaders(headerArray: bsv.Header[]): Promise<Buffer[]> {
    const hashes: Buffer[] = [];
    for (const header of headerArray) {
      const hash = header.getHash();
      if (!this.dbi_headers.get(hash)) hashes.push(hash);
      this.dbi_headers.put(hash, header.toBuffer());
    }
    return hashes;
  }

  getHeader(hash: string | Buffer): bsv.Header {
    if (!Buffer.isBuffer(hash)) hash = Buffer.from(hash, "hex");
    if (hash.toString("hex") === this.headers.genesis) {
      return this.headers.genesisHeader;
    }
    const buf = this.dbi_headers.getBinary(hash);
    if (!buf) throw Error(`Missing header: ${hash.toString("hex")}`);
    const header = bsv.Header.fromBuffer(buf);
    return header;
  }

  loadHeaders() {
    for (const { key: hash, value: buf } of this.dbi_headers.getRange()) {
      if (Buffer.isBuffer(hash) && Buffer.isBuffer(buf))
        this.headers.addHeader({ buf, hash });
    }
    this.headers.process();
  }
}
