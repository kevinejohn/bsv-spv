import { Worker, Master, MasterOptions } from "../src";
import path from "path";
import cluster from "cluster";

const port = 8080;

const config: MasterOptions = {
  ticker: "BSV",
  // nodes: [`18.192.253.59:8333`, `95.217.197.54:8333`],
  nodes: [`95.217.197.54:8333`],
  // nodes: [`18.192.253.59:8333`, `100.11.101.138:8333`, `100.25.248.168:8333`],
  forceUserAgent: `Bitcoin SV`,
  user_agent: "Bitcoin SV",
  invalidBlocks: [
    "00000000000000000019f112ec0a9982926f1258cdcc558dd7c3b7e5dc7fa148", // BTC fork 478559
    "0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c", // BCH fork 556767
  ],
  dataDir: path.join(__dirname, "data"),
  pruneBlocks: 0, // 0 for no block pruning
  blockHeight: -1, // Sync to block height
  mempool: 0, // Watch mempool
  blocks: 1, // Watch blocks
  // DEBUG_LOG: true, // p2p network console.logs
};

if (cluster.isWorker) {
  const worker = new Worker();
} else if (cluster.isPrimary) {
  const master = new Master(config);
  master.startServer({ port });
}
