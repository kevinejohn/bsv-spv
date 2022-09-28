import express from "express";
import Http from "http";
import * as Helpers from "./helpers";
import Listener from "./listener";

export default class Server extends Listener {
  app: any;
  server: any;
  SHOW_LOGS: boolean;

  constructor({
    name,
    ticker,
    dataDir,
    MAX_FILE_SIZE = 1024 * 1024 * 500, // 500MB
    disableInterval = true,
  }: {
    name: string;
    ticker: string;
    dataDir: string;
    MAX_FILE_SIZE?: number;
    disableInterval?: boolean;
  }) {
    super({ name, ticker, blockHeight: -1, dataDir, disableInterval });

    this.SHOW_LOGS = true;
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
            this.SHOW_LOGS &&
              console.log(
                `${req.ip} /txid/${txid} ${Helpers.formatBytes(
                  size
                )} from mempool`
              );
          } else {
            let heightInt = parseInt(`${height}`);
            let lenInt = parseInt(`${len}`);
            let posInt = parseInt(`${pos}`);
            if (!(lenInt > 0 && lenInt <= MAX_FILE_SIZE))
              throw Error(`Invalid len`);
            if (!(posInt > 0)) throw Error(`Invalid pos`);
            if (block && !`${block}`.match(/^[a-f0-9]{64}$/))
              throw Error(`Invalid block`);
            if (!block) block = this.headers.getHash(heightInt);

            const { tx } = await this.db_blocks.getTx({
              txid,
              block: `${block}`,
              pos: posInt,
              len: lenInt,
            });
            if (!tx) throw Error(`Not found`);
            const size = tx.toBuffer().length;
            res.setHeader("x-block-hash", `${block}`);
            res.setHeader("x-block-pos", `${pos}`);
            res.setHeader("x-block-len", `${lenInt}`);
            try {
              heightInt = this.headers.getHeight(`${block}`);
              res.setHeader("x-block-height", `${heightInt}`);
            } catch (err) {}
            try {
              const time = this.db_headers.getHeader(`${block}`).time;
              res.setHeader("x-block-time", `${time}`);
            } catch (err) {}
            res.send(tx.toBuffer());
            this.SHOW_LOGS &&
              console.log(
                `${req.ip} /txid/${txid} ${Helpers.formatBytes(
                  size
                )} from block ${height} ${block}`
              );
          }
        } catch (err) {
          throw Error(`Tx not found`);
        }
      } catch (err: any) {
        this.SHOW_LOGS &&
          console.error(
            `${req.ip} /txid/${txid} error: ${err.message} ${
              pos ? `in block ${height} ${block}, ${pos}, ${len}` : "mempool"
            }`
          );
        res.status(404).send(err.message);
      }
    });
  }

  listen({ port = 8081, host = "localhost", SHOW_LOGS = true }) {
    this.SHOW_LOGS = SHOW_LOGS;
    this.server.listen(port, host, () => {
      console.log(`Tx server listening on ${host}:${port}`);
    });
  }
}
