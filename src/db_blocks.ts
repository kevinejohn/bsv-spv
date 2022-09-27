import * as bsv from "bsv-minimal";
import path from "path";
import fs from "fs";

export default class DbBlocks {
  blocksDir: string;
  writeDir?: string;
  writeStream?: fs.WriteStream;

  constructor({ blocksDir }: { blocksDir: string }) {
    if (!blocksDir) throw Error(`Missing blocksDir`);
    this.blocksDir = blocksDir;
    fs.mkdirSync(blocksDir, { recursive: true });
  }

  getBlocks() {
    const files = fs.readdirSync(this.blocksDir);
    return files;
  }

  getSavedBlocks() {
    const hashes = [];
    const files = fs.readdirSync(this.blocksDir);
    for (const file of files) {
      const split = file.split(".");
      if (split.length === 2 && split[0].length === 64) {
        const hash = split[0];
        hashes.push(hash);
      }
    }
    return hashes;
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
        const dir = this.writeDir;
        this.writeStream.close((err: any) => {
          try {
            if (err) throw err;
            if (dir && !fs.existsSync(dir)) {
              // Save block to disk
              fs.renameSync(`${dir}.${process.pid}`, dir);
              return resolve(true);
            } else {
              // Block already saved. Delete copy
              throw Error(`Block already saved`);
            }
          } catch (err) {
            // console.error(err);
            try {
              fs.unlinkSync(`${dir}.${process.pid}`);
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
    callback: (params: bsv.BlockStream) => Promise<void> | void
  ) {
    return new Promise((resolve, reject) => {
      try {
        if (typeof callback !== "function") throw Error(`Missing callback`);
        hash = hash.toString("hex");
        hash = hash.split(".").length > 1 ? hash : `${hash}.bin`;
        const dir = path.join(this.blocksDir, hash);
        if (!fs.existsSync(dir)) throw Error(`Missing block ${hash}`);

        const block = new bsv.Block();
        const stream = fs.createReadStream(dir);
        stream.on("data", async (data: Buffer) => {
          try {
            const result = block.addBufferChunk(data);
            // const { transactions, header, started, finished, height, size } = result;
            stream.pause();
            if (height >= 0) result.height = height;
            await callback(result);
            stream.resume();
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

  delBlock(hash: string | Buffer) {
    let dir;
    hash = hash.toString("hex");
    if (hash.split(".").length > 1) {
      dir = path.join(this.blocksDir, hash);
    } else {
      dir = path.join(this.blocksDir, `${hash}.bin`);
    }
    fs.unlinkSync(dir);
  }

  blockExists(hash: string) {
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
