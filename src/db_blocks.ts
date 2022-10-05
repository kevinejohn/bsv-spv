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
    let initialize = false;
    if (!fs.existsSync(dbPath)) initialize = true;
    fs.mkdirSync(dbPath, { recursive: true });

    this.dbi_root = lmdb.open({ path: dbPath, readOnly });
    this.dbi_blocks = this.dbi_root.openDB({
      name: "blocks",
      encoding: "binary",
      keyEncoding: "binary",
    });

    if (initialize && !readOnly) {
      const hashes = Array.from(this.getSavedBlocksSync());
      for (const hash of hashes) {
        this.dbi_blocks.putSync(Buffer.from(hash, "hex"), Buffer.from(""));
      }
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
              await this.dbi_blocks.put(blockHash, Buffer.from(""));
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
    { hash, height }: { hash: string | Buffer; height: number },
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

        const block = new bsv.Block();
        const stream = fs.createReadStream(dir);
        stream.on("data", async (data: Buffer) => {
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
          } catch (err) {
            stream.destroy();
            reject(err);
          }
        });
        stream.on("end", () => resolve(true));
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
    await this.dbi_blocks.remove(Buffer.from(hash, "hex"));
  }

  blockExists(hash: string) {
    return this.dbi_blocks.doesExist(Buffer.from(hash, "hex"));
  }

  blockExistsSync(hash: string) {
    const dir = path.join(this.blocksDir, `${hash}.bin`);
    return fs.existsSync(dir);
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
