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
  }) {
    super({ name, ticker, host, port, dataDir });
    this.MAX_FILE_SIZE = MAX_FILE_SIZE;

    const app = express();
    this.app = app;
    this.server = Http.createServer(app);

    app.get("/txid/:txid", async (req, res) => {
      const { txid } = req.params;
      let { pos, len, block } = req.query;
      try {
        if (!txid.match(/^[a-f0-9]{64}$/)) throw Error(`Invalid txid`);
        if (block && !block.match(/^[a-f0-9]{64}$/))
          throw Error(`Invalid block`);
        if (len) len = parseInt(len);
        if (pos) pos = parseInt(pos);
        if (len && !(len > 0 && len <= this.MAX_FILE_SIZE))
          throw Error(`Invalid len`);
        if (pos && !(pos > 0)) throw Error(`Invalid pos`);

        try {
          let size, height;
          if (!block) {
            const { tx, time } = this.db_mempool.getTx(txid, true);
            size = tx.toBuffer().length;
            res.setHeader("x-ticker", `${this.ticker}`);
            res.setHeader("x-mempool-time", `${time}`);
            res.send(tx.toBuffer());
            console.log(
              `${req.ip} /txid/${txid} ${Helpers.formatBytes(
                size
              )} from mempool`
            );
          } else {
            const { tx } = await this.db_blocks.getTx({
              txid,
              block,
              pos,
              len,
            });
            size = tx.toBuffer().length;
            res.setHeader("x-ticker", `${this.ticker}`);
            res.setHeader("x-block-hash", `${block}`);
            res.setHeader("x-block-pos", `${pos}`);
            res.setHeader("x-block-len", `${len}`);
            try {
              height = this.headers.getHeight(block);
              res.setHeader("x-block-height", `${height}`);
            } catch (err) {}
            try {
              const header = this.db_headers.getHeader(block);
              res.setHeader("x-block-time", `${header.time}`);
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
        console.error(`${req.ip} /txid/${txid} error: ${err.message}`);
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
