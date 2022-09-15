const fs = require("fs");
const path = require("path");
const bsv = require("bsv-minimal");

class DbBlocks {
  constructor({ blocksDir }) {
    if (!blocksDir) throw Error(`Missing blocksDir`);
    this.blocksDir = blocksDir;
    fs.mkdirSync(blocksDir, { recursive: true });
  }

  getBlocks() {
    const files = fs.readdirSync(this.blocksDir);
    return files;
  }

  writeBlockChunk({ chunk, blockHash, started, finished }) {
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

      this.writeStream.write(chunk);

      if (finished) {
        const dir = this.writeDir;
        this.writeStream.close((err) => {
          try {
            if (err) throw err;
            if (!fs.existsSync(dir)) {
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
        this.writeStream = null;
      } else {
        resolve();
      }
    });
  }

  streamBlock({ hash, height }, callback) {
    return new Promise((resolve, reject) => {
      try {
        const startDate = +new Date();
        if (typeof callback !== "function") throw Error(`Missing callback`);
        hash = hash.toString("hex");
        hash = hash.split(".").length > 1 ? hash : `${hash}.bin`;
        const dir = path.join(this.blocksDir, hash);
        if (!fs.existsSync(dir)) throw Error(`Missing block ${hash}`);

        const block = new bsv.Block();
        const stream = fs.createReadStream(dir);
        stream.on("data", async (data) => {
          try {
            const result = block.addBufferChunk(data);
            // const { transactions, header, started, finished, height, size } = result;
            stream.pause();
            const obj = { ...result, startDate };
            if (height >= 0) obj.height = height;
            await callback(obj);
            stream.resume();
          } catch (err) {
            stream.destroy();
            reject(err);
          }
        });
        stream.on("end", () => resolve());
        stream.on("error", (err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  }

  delBlock(hash) {
    let dir;
    hash = hash.toString("hex");
    if (hash.split(".").length > 1) {
      dir = path.join(this.blocksDir, hash);
    } else {
      dir = path.join(this.blocksDir, `${hash}.bin`);
    }
    fs.unlinkSync(dir);
  }

  blockExists(hash) {
    const dir = path.join(this.blocksDir, `${hash}.bin`);
    return fs.existsSync(dir);
  }

  getTx({ txHash, block, pos, len }) {
    return new Promise((resolve, reject) => {
      const dir = path.join(this.blocksDir, `${block.toString("hex")}.bin`);
      fs.open(dir, "r", function (err, fd) {
        if (err) return reject(err);
        fs.read(fd, Buffer.alloc(len), 0, len, pos, (err, bytesRead, buf) => {
          try {
            if (err) throw err;
            if (bytesRead !== len) throw Error(`Could not read full file`);
            const tx = bsv.Transaction.fromBuffer(buf);
            if (
              txHash &&
              txHash.toString("hex") !== tx.getHash().toString("hex")
            ) {
              throw Error(`Invalid txid`);
            }
            resolve({ tx });
          } catch (err) {
            reject(err);
          }
        });
      });
    });
  }
}

module.exports = DbBlocks;
