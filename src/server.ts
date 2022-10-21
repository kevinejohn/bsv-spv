import express, { Express } from "express";
import Http from "http";
import * as Helpers from "./helpers";
import Listener from "./listener";
import * as bsv from "bsv-minimal";
import DbMempool from "./db_mempool";
import path from "path";

export default class Server extends Listener {
  app: Express;
  server: Http.Server;
  SHOW_LOGS: boolean;
  db_mempool?: DbMempool;
  MAX_FILE_SIZE: number;

  constructor({
    name,
    ticker,
    dataDir,
    MAX_FILE_SIZE = 1024 * 1024 * 500, // 500MB
    disableInterval = false,
    mempool = true,
    DEBUG_MEMORY = false,
  }: {
    name: string;
    ticker: string;
    dataDir: string;
    mempool?: boolean;
    MAX_FILE_SIZE?: number;
    disableInterval?: boolean;
    DEBUG_MEMORY?: boolean;
  }) {
    super({
      name,
      ticker,
      blockHeight: -1,
      dataDir,
      disableInterval,
      DEBUG_MEMORY,
    });

    if (mempool) {
      const mempoolDir = path.join(dataDir, ticker, "mempools", name);
      this.db_mempool = new DbMempool({ mempoolDir });
      this.on(
        "mempool_tx",
        ({ transaction }: { transaction: bsv.Transaction }) => {
          this.db_mempool && this.db_mempool.saveTx(transaction);
        }
      );
    }

    this.SHOW_LOGS = true;
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
            if (!this.db_mempool) throw Error(`Mempool txs not available`);
            const { tx, size, time } = await this.db_mempool.getTx(txid);
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
            if (!(lenInt > 0 && lenInt <= this.MAX_FILE_SIZE))
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
