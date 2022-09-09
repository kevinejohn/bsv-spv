const BsvSpv = require("../src");
const path = require("path");
const cluster = require("cluster");

const ticker = "BSV";
const nodes = [`18.192.253.59:8333`];
const invalidBlocks = [];
const dataDir = path.join(__dirname, "data");
const pruneBlocks = 3;
const blocks = true;
const mempool = true;

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught Exception thrown");
  process.exit(1);
});

if (cluster.isWorker) {
  let spv;

  process.on("message", async (msg) => {
    const obj = JSON.parse(msg);
    //   process.send(msg);
    if (obj.command === "init") {
      const {
        ticker,
        dataDir,
        node,
        blocks,
        mempool,
        pruneBlocks,
        invalidBlocks,
      } = obj;

      try {
        let date = +new Date();
        spv = new BsvSpv({
          ticker,
          node,
          dataDir,
          pruneBlocks,
          invalidBlocks,
        });
        let { height, hash } = spv.getTip();
        console.log(
          `Loaded headers in ${
            (+new Date() - date) / 1000
          } seconds. Latest tip: ${height}, ${hash}`
        );

        spv.on("disconnected", ({ node, disconnects }) => {
          console.log(`Node ${node} disconnected ${disconnects} times`);
        });
        spv.on("connected", async ({ node }) => {
          console.log(`Node ${node} connected`);
        });
        spv.on("version", async ({ node, version }) => {
          // Will be called on connected/reconnect and version negotiated
          console.log(`Node ${node} version`, version);

          console.log(`Syncing headers...`);
          await spv.syncHeaders();
          console.log(`Synced headers.`);

          if (blocks) {
            console.log(
              `Syncing ${pruneBlocks > 0 ? pruneBlocks : ""} latest blocks...`
            );
            await spv.syncBlocks();
            console.log(
              `Synced all ${pruneBlocks > 0 ? pruneBlocks : ""} blocks!`
            );
          }
        });
        spv.on("reorg_detected", ({ height, hash }) => {
          console.log(`Re-org detected after block height ${height}, ${hash}!`);
          if (blocks) spv.syncBlocks(); // Re-sync blocks
        });
        spv.on("pruned_block", ({ height, hash }) => {
          console.log(`Pruned block ${height}, ${hash}`);
        });
        spv.on("block_saved", ({ height, hash, size }) => {
          console.log(`Saved block ${height}, ${hash}, ${size} bytes`);
        });
        spv.on("block_hashes", ({ hashes }) => {
          console.log(
            `New block announced: ${hashes
              .map((h) => h.toString("hex"))
              .join(", ")}`
          );
        });
        spv.on("new_headers", ({ headers }) => {
          const { height, hash } = spv.getTip();
          console.log(
            `Downloaded ${headers.length} new headers. Tip: ${height}, ${hash}`
          );
        });

        console.log(`Connecting to ${ticker} node ${node}...`);
        await spv.connect();

        if (blocks) {
          spv.onBlockTx(
            ({ transactions, header, started, finished, height, size }) => {
              for (const [index, transaction] of transactions) {
                // console.log(
                //   `tx ${transaction
                //     .getHash()
                //     .toString("hex")} in index ${index} of block ${height}`
                // );
              }
            }
          );
          console.log(`${node} Listening for new blocks...`);

          await spv.warningPruneBlocks();
        }

        if (mempool) {
          spv.onMempoolTx(({ transaction }) => {
            // console.log(
            //   `tx ${transaction.getHash().toString("hex")} seen in mempool`
            // );
          });
          console.log(`Listening for mempool txs...`);
        }
      } catch (err) {
        console.error(err);
        // TODO: Kill?
      }
    }
  });
} else if (cluster.isPrimary) {
  const workers = {};

  for (const node of nodes) {
    if (blocks) {
      const worker = cluster.fork();
      const opts = {
        command: "init",
        ticker,
        dataDir,
        node,
        blocks,
        pruneBlocks,
        invalidBlocks,
      };
      worker.send(JSON.stringify(opts));
      worker.BsvSpvOpts = opts;
      workers[`blocks-${node}`] = worker;
      console.log(`Forked worker: blocks-${node}`);
    }
    if (mempool) {
      const worker = cluster.fork();
      const opts = {
        command: "init",
        ticker,
        dataDir,
        node,
        mempool,
        pruneBlocks,
        invalidBlocks,
      };
      worker.send(JSON.stringify(opts));
      worker.BsvSpvOpts = opts;
      workers[`mempool-${node}`] = worker;
      console.log(`Forked worker: mempool-${node}`);
    }
  }
}
