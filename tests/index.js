const BsvSpv = require("../src");
const path = require("path");
const assert = require("assert");

const ticker = "BSV";
const forceUserAgent = `Bitcoin SV`;
const node = `18.192.253.59:8333`;
const invalidBlocks = [];
const dataDir = path.join(__dirname, "data");
const pruneBlocks = 10;
const blockHeight = -1; // Sync to block height

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught Exception thrown");
  process.exit(1);
});

(async () => {
  let date = +new Date();
  const spv = new BsvSpv({
    ticker,
    node,
    forceUserAgent,
    blockHeight,
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

    console.log(
      `Syncing ${pruneBlocks > 0 ? pruneBlocks : ""} latest blocks...`
    );
    await spv.syncAllBlocks();
    console.log(`Synced all ${pruneBlocks > 0 ? pruneBlocks : ""} blocks!`);
  });
  spv.on("version_invalid", ({ user_agent }) => {
    console.log(
      `Node ${node} has an invalid user_agent: ${user_agent}. Will only connect to nodes that match "${forceUserAgent}"`
    );
  });
  spv.on("headers_new", ({ headers }) => {
    const { height, hash } = spv.getTip();
    console.log(`${headers.length} new headers. Tip: ${height}, ${hash}`);
  });

  // Block events
  spv.on("block_reorg", ({ height, hash }) => {
    console.log(`Re-org detected after block height ${height}, ${hash}!`);
    spv.syncAllBlocks(); // Re-sync blocks
  });
  spv.on("block_pruned", ({ height, hash }) => {
    console.log(`Pruned block ${height}, ${hash}`);
  });
  spv.on("block_saved", ({ height, hash, size }) => {
    console.log(`Saved block ${height}, ${hash}, ${size} bytes`);
  });
  spv.on("block_seen", ({ hashes }) => {
    console.log(
      `New block: ${hashes.map((h) => h.toString("hex")).join(", ")}`
    );
  });
  spv.on(
    `block_txs`,
    ({ transactions, header, started, finished, height, size }) => {
      // for (const [index, transaction] of transactions) {
      //   console.log(
      //     `tx ${transaction
      //       .getHash()
      //       .toString("hex")} in index ${index} of block ${height}`
      //   );
      // }
    }
  );

  // Mempool events
  spv.on("mempool_pruned", ({ hashes, header, height }) => {
    console.log(
      `Pruned ${hashes.length} mempool txs ${
        header ? `after seen in block ${height}` : ""
      }`
    );
  });
  spv.on(`mempool_tx`, ({ transaction }) => {
    // console.log(
    //   `tx ${transaction.getHash().toString("hex")} downloaded from mempool`
    // );
  });
  spv.on(`mempool_txs_seen`, ({ hashes }) => {
    // console.log(`${hashes.length} txs seen in mempool`);
  });
  spv.on(`mempool_txs_saved`, ({ hashes }) => {
    // console.log(`${hashes.length} new txs saved from mempool`);
  });

  await spv.warningPruneBlocks();
  spv.onBlockTx(); // Download blocks
  console.log(`Listening for new blocks...`);

  await spv.pruneMempool(); // Delete old mempool txs if they exist
  spv.onMempoolTx(); // Download mempool txs
  console.log(`Listening for mempool txs...`);

  console.log(`Connecting to ${ticker} node ${node}...`);
  await spv.connect();

  // assert.equal(
  //   spv.getHash(123000),
  //   "00000000000069b73594b10aaa38beaeadc6d3f28cab8d76c4a6ac182694fd41"
  // );
  // assert.equal(
  //   spv.getHeight(
  //     "0000000000002fe5f29af38282ac1c8f4ea2bf8a0855946150130419491b6c05"
  //   ),
  //   122000
  // );
  // assert.equal(spv.getHeader({ height: 123000 }).time, 1304983906);
  // assert.equal(
  //   spv.getHeader({
  //     hash: "0000000000002fe5f29af38282ac1c8f4ea2bf8a0855946150130419491b6c05",
  //   }).time,
  //   1304590900
  // );

  // // Download specific block example
  // height = 119990;
  // await spv.downloadBlock(height); // Transactions will come through `onBlockTx`. Returns false if block is already saved to disk
  // // Streams locally saved block from disk. No memory constraints
  // await spv.readBlock(
  //   height,
  //   ({ transaction, index, header, started, finished, size, height }) => {
  //     if (finished) {
  //       console.log(header, size);
  //     }
  //   }
  // );
})();
