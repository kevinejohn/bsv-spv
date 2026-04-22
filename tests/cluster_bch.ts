import { Worker, Master, MasterOptions } from "../src";
import path from "path";
import cluster from "cluster";

const port = 8080;

const config: MasterOptions = {
  ticker: "BCH",
  nodes: [`162.55.69.229:8333`],
  // enableIpv6: true,
  forceUserAgent: `Bitcoin Cash`,
  user_agent: "Bitcoin Cash",
  dataDir: path.join(__dirname, "data"),
  pruneBlocks: 0, // 0 for no block pruning
  blockHeight: -1, // Sync to block height
  mempool: 1, // Watch mempool
  blocks: 1, // Watch blocks
  // DEBUG_LOG: true, // p2p network console.logs
};

if (cluster.isWorker) {
  const worker = new Worker();
} else if (cluster.isPrimary) {
  const master = new Master(config);
  master.startServer({ port });
}
