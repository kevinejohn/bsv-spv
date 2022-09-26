import { DbMempool } from "../src";
import path from "path";

const mempoolDir = path.join(__dirname, "data/BSV/mempool");
const db = new DbMempool({ mempoolDir, readOnly: false });
const { txs, size } = db.getTxs();
const hashes = db.getTxids({});

console.log(
  `${Object.keys(txs).length} txs (${
    hashes.length
  } times) in mempool db. ${Number(size).toLocaleString("en-US")} bytes total`
);
