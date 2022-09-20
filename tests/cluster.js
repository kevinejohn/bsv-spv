const { Worker, Master } = require("../src");
const path = require("path");
const cluster = require("cluster");

const port = 8080;

const config = {
  ticker: "BSV",
  nodes: [`18.192.253.59:8333`],
  forceUserAgent: `Bitcoin SV`,
  // user_agent: 'Bitcoin SV',
  invalidBlocks: [],
  dataDir: path.join(__dirname, "data"),
  pruneBlocks: 0, // 0 for no block pruning
  blockHeight: -1, // Sync to block height
  MEMPOOL_PRUNE_AFTER: 1000 * 60 * 60 * 2, // 2 hours
  // DEBUG_LOG: true,
};

if (cluster.isWorker) {
  const worker = new Worker();
} else if (cluster.isPrimary) {
  const master = new Master(config);
  master.startServer({ port });
}
