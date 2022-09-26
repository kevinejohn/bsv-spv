import { Worker, Master } from "../src";
import path from "path";
import cluster from "cluster";

const port = 8080;

const config = {
  ticker: "BSV",
  // nodes: [`18.192.253.59:8333`, `95.217.197.54:8333`],
  nodes: [`95.217.197.54:8333`],
  forceUserAgent: `Bitcoin SV`,
  // user_agent: 'Bitcoin SV',
  invalidBlocks: [],
  dataDir: path.join(__dirname, "data"),
  pruneBlocks: 0, // 0 for no block pruning
  blockHeight: -1, // Sync to block height
  mempool: true, // Watch mempool
  blocks: false, // Watch blocks
  MEMPOOL_PRUNE_AFTER: 1000 * 60 * 60 * 2, // 2 hours
  // DEBUG_LOG: true, // p2p network console.logs
};

if (cluster.isWorker) {
  const worker = new Worker();
} else if (cluster.isPrimary) {
  const master = new Master(config);
  master.startServer({ port });
}
