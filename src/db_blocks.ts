import * as bsv from "bsv-minimal";
import path from "path";
import * as lmdb from "lmdb";
import fs from "fs";

export default class DbBlocks {
  blocksDir: string;
  writeDir?: string;
  writeStream?: fs.WriteStream;
  dbi_blocks: lmdb.Database<Buffer>;
  dbi_root: lmdb.RootDatabase<Buffer>;
  dbPath: string;

  constructor({
    blocksDir,
    readOnly = true,
  }: {
    blocksDir: string;
    readOnly?: boolean;
  }) {
    if (!blocksDir) throw Error(`Missing blocksDir`);
    this.blocksDir = blocksDir;
    fs.mkdirSync(blocksDir, { recursive: true });
    const dbPath = path.join(blocksDir, "meta");
    this.dbPath = dbPath;

    fs.mkdirSync(this.dbPath, { recursive: true });
    this.dbi_root = lmdb.open({
      path: this.dbPath,
      readOnly,
    });
    this.dbi_blocks = this.dbi_root.openDB({
      name: "blocks",
      encoding: "binary",
      keyEncoding: "binary",
      cache: true,
    });
  }

  async syncDb() {
    const startDate = +new Date();
    console.log(`Syncing block files with db...`);
    const count = this.dbi_blocks.getKeysCount({ limit: 10 });
    if (count === 0) {
      const hashes = Array.from(this.getSavedBlocksSync());
      for (const hash of hashes) {
        this.markBlockSaved(hash);
      }
      await this.dbi_blocks.flushed;
      console.log(
        `Synced ${hashes.length} block files with db in ${
          (+new Date() - startDate) / 1000
        } seconds`
      );
    }
  }

  async close() {
    try {
      await this.dbi_blocks.close();
    } catch (err) {}
    try {
      await this.dbi_root.close();
    } catch (err) {}
  }

  getSavedBlocks() {
    const hashes: string[] = [];
    for (const key of this.dbi_blocks.getKeys()) {
      if (Buffer.isBuffer(key)) hashes.push(key.toString("hex"));
    }
    return hashes;
  }

  async getBlocks() {
    const files = await fs.promises.readdir(this.blocksDir);
    return files;
  }

  getBlocksSync() {
    const files = fs.readdirSync(this.blocksDir);
    return files;
  }

  getSavedBlocksSync() {
    const hashes: Set<string> = new Set();
    const files = this.getBlocksSync();
    for (const file of files) {
      const split = file.split(".");
      if (split.length === 2 && split[0].length === 64) {
        const hash = split[0];
        hashes.add(hash);
      }
    }
    return hashes;
  }

  async fileExists(dir: string) {
    try {
      await fs.promises.access(dir, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  markBlockSaved(hash: string) {
    if (!this.blockExists(hash)) {
      return this.dbi_blocks.put(Buffer.from(hash, "hex"), Buffer.from(""));
    }
  }

  writeBlockChunk({
    chunk,
    blockHash,
    started,
    finished,
  }: {
    chunk: Buffer;
    blockHash: Buffer;
    started: boolean;
    finished: boolean;
  }) {
    return new Promise((resolve, reject) => {
      if (started) {
        this.writeDir = path.join(
          this.blocksDir,
          `${blockHash.toString("hex")}.bin`
        );
        this.writeStream = fs.createWriteStream(
          `${this.writeDir}.${process.pid}`
        );
      }
      if (!this.writeStream) throw Error(`No WriteStream`);

      this.writeStream.write(chunk);

      if (finished) {
        if (!this.writeDir) return reject(Error(`Missing writeDir`));
        const dir = this.writeDir;
        this.writeStream.close(async (err: any) => {
          try {
            if (err) throw err;
            const fileExists = await this.fileExists(dir);
            if (!fileExists) {
              // Save block to disk
              await fs.promises.rename(`${dir}.${process.pid}`, dir);
              this.markBlockSaved(blockHash.toString("hex"));
              return resolve(true);
            } else {
              // Block already saved. Delete copy
              throw Error(`Block already saved`);
            }
          } catch (err) {
            // console.error(err);
            try {
              await fs.promises.unlink(`${dir}.${process.pid}`);
            } catch (err) {}
          }
          resolve(false);
        });
        this.writeStream = undefined;
      } else {
        resolve(false);
      }
    });
  }

  streamBlock(
    {
      hash,
      height,
      highWaterMark = 100000000,
    }: { hash: string | Buffer; height: number; highWaterMark?: number },
    callback: (params: bsv.BlockStream) => Promise<any> | any
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof callback !== "function") throw Error(`Missing callback`);
        hash = hash.toString("hex");
        hash = hash.split(".").length > 1 ? hash : `${hash}.bin`;
        const dir = path.join(this.blocksDir, hash);
        const fileExists = await this.fileExists(dir);
        if (!fileExists) {
          await this.delBlock(hash);
          throw Error(`Missing block ${hash}`);
        }

        let fileEnd = false;
        let readingData = false;
        const block = new bsv.Block();
        const stream = fs.createReadStream(dir, { highWaterMark });
        stream.on("data", async (data: Buffer) => {
          readingData = true;
          try {
            const result = block.addBufferChunk(data);
            // const { transactions, header, started, finished, height, size } = result;

            if (height >= 0) result.height = height;
            const promise = callback(result);
            if (promise instanceof Promise) {
              stream.pause();
              await promise;
              stream.resume();
            }
            if (result.finished) {
              resolve(true);
            } else if (fileEnd) {
              throw Error(`Block is missing bytes`);
            }
          } catch (err) {
            stream.destroy();
            reject(err);
          }
          readingData = false;
        });
        stream.on("end", () => {
          fileEnd = true;
          if (!readingData) {
            const err = Error(`Block is missing bytes`);
            reject(err);
          }
        });
        stream.on("error", (err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  }

  async delBlock(hash: string | Buffer) {
    let dir;
    hash = hash.toString("hex");
    if (hash.split(".").length > 1) {
      dir = path.join(this.blocksDir, hash);
    } else {
      dir = path.join(this.blocksDir, `${hash}.bin`);
    }
    await fs.promises.unlink(dir);
    hash = hash.split(".")[0];
    if (this.blockExists(hash)) {
      await this.dbi_blocks.remove(Buffer.from(hash, "hex"));
    }
  }

  blockExists(hash: string) {
    return this.dbi_blocks.doesExist(Buffer.from(hash, "hex"));
  }

  blockFileExists(hash: string) {
    const dir = path.join(this.blocksDir, `${hash}.bin`);
    return this.fileExists(dir);
  }

  async getTx({
    txid,
    block,
    pos,
    len = 1000000,
  }: {
    txid?: string | Buffer;
    block: string | Buffer;
    pos: number;
    len: number;
  }) {
    const dir = path.join(this.blocksDir, `${block.toString("hex")}.bin`);
    const file = await fs.promises.open(dir, "r");
    const { bytesRead, buffer } = await file.read(
      Buffer.alloc(len),
      0,
      len,
      pos
    );
    await file.close();
    let tx;
    if (txid) {
      tx = bsv.Transaction.fromBuffer(buffer);
      if (txid && txid.toString("hex") !== tx.getTxid()) {
        throw Error(`Invalid txid`);
      }
    }
    return { tx, buffer, bytesRead };
  }
}
