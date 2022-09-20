const express = require("express");
const Http = require("http");
const Helpers = require("./helpers");
const Listener = require("./listener");

class Server extends Listener {
  constructor({
    name,
    ticker,
    host,
    port,
    dataDir,
    MAX_FILE_SIZE = 1024 * 1024 * 500, // 500MB
    disableInterval = true,
  }) {
    super({ name, ticker, host, port, dataDir, disableInterval });
    this.MAX_FILE_SIZE = MAX_FILE_SIZE;

    const app = express();
    this.app = app;
    this.server = Http.createServer(app);

    app.get("/txid/:txid", async (req, res) => {
      const { txid } = req.params;
      let { pos, len, block, height } = req.query;
      try {
        if (!txid.match(/^[a-f0-9]{64}$/)) throw Error(`Invalid txid`);
        res.setHeader("x-ticker", `${this.ticker}`);

        try {
          if (!pos) {
            const { tx, time } = this.db_mempool.getTx(txid, true);
            const size = tx.toBuffer().length;
            res.setHeader("x-mempool-time", `${time}`);
            res.send(tx.toBuffer());
            console.log(
              `${req.ip} /txid/${txid} ${Helpers.formatBytes(
                size
              )} from mempool`
            );
          } else {
            height = parseInt(height);
            len = parseInt(len);
            pos = parseInt(pos);
            if (!(len > 0 && len <= this.MAX_FILE_SIZE))
              throw Error(`Invalid len`);
            if (!(pos > 0)) throw Error(`Invalid pos`);
            if (block && !block.match(/^[a-f0-9]{64}$/))
              throw Error(`Invalid block`);
            if (!block) block = this.headers.getHash(height);

            const { tx } = await this.db_blocks.getTx({
              txid,
              block,
              pos,
              len,
            });
            const size = tx.toBuffer().length;
            res.setHeader("x-block-hash", `${block}`);
            res.setHeader("x-block-pos", `${pos}`);
            res.setHeader("x-block-len", `${len}`);
            try {
              height = this.headers.getHeight(block);
              res.setHeader("x-block-height", `${height}`);
            } catch (err) {}
            try {
              const time = this.db_headers.getHeader(block).time;
              res.setHeader("x-block-time", `${time}`);
            } catch (err) {}
            res.send(tx.toBuffer());
            console.log(
              `${req.ip} /txid/${txid} ${Helpers.formatBytes(
                size
              )} from block ${height} ${block}`
            );
          }
        } catch (err) {
          throw Error(`Tx not found`);
        }
      } catch (err) {
        console.error(
          `${req.ip} /txid/${txid} error: ${err.message} ${
            pos ? `in block ${height} ${block}, ${pos}, ${len}` : "mempool"
          }`
        );
        res.status(404).send(err.message);
      }
    });
  }

  listen(opts = {}) {
    const { port = 8081, host = "localhost" } = opts;
    this.server.listen(port, host, () => {
      console.log(`Tx server listening on ${host}:${port}`);
    });
  }
}

module.exports = Server;