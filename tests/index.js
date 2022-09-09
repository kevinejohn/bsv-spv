const BsvSpv = require("../src");
const path = require("path");
const assert = require("assert");

const ticker = "BSV";
const node = `18.192.253.59:8333`;
const invalidBlocks = [];
const dataDir = path.join(__dirname, "data");
const pruneBlocks = 3;

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught Exception thrown");
  process.exit(1);
});

(async () => {
  let date = +new Date();
  const spv = new BsvSpv({ ticker, node, dataDir, pruneBlocks, invalidBlocks });
  let { height, hash } = spv.getTip();
  console.log(
    `Loaded headers in ${
      (+new Date() - date) / 1000
    } seconds. Latest tip: ${height}, ${hash}`
  );

  spv.on("disconnected", ({ node, disconnects }) => {
    console.log(`Node ${node} disconnected ${disconnects} times`);
  });
  spv.on("connected", ({ node }) => {
    console.log(`Node ${node} connected`);
  });
  spv.on("reorg_detected", ({ height, hash }) => {
    console.log(`Re-org detected after block height ${height}, ${hash}!`);
  });
  spv.on("pruned_block", ({ height, hash }) => {
    console.log(`Pruned block ${height}, ${hash}`);
  });
  spv.on("block_saved", ({ height, hash, size }) => {
    console.log(`Saved block ${height}, ${hash}, ${size} bytes`);
  });
  spv.on("block_hashes", ({ hashes }) => {
    console.log(
      `New block announced: ${hashes.map((h) => h.toString("hex").join(", "))}`
    );
  });
  spv.on("new_headers", ({ headers }) => {
    const { height, hash } = spv.getTip();
    console.log(
      `Downloaded ${headers.length} new headers. Tip: ${height}, ${hash}`
    );
  });

  try {
    console.log(`Connecting to ${ticker} node ${node}...`);
    await spv.connect();

    console.log(`Syncing headers...`);
    await spv.syncHeaders();
    console.log(`Synced headers.`);

    assert.equal(
      spv.getHash(123000),
      "00000000000069b73594b10aaa38beaeadc6d3f28cab8d76c4a6ac182694fd41"
    );
    assert.equal(
      spv.getHeight(
        "0000000000002fe5f29af38282ac1c8f4ea2bf8a0855946150130419491b6c05"
      ),
      122000
    );
    assert.equal(spv.getHeader({ height: 123000 }).time, 1304983906);
    assert.equal(
      spv.getHeader({
        hash: "0000000000002fe5f29af38282ac1c8f4ea2bf8a0855946150130419491b6c05",
      }).time,
      1304590900
    );

    // Will download and save all new blocks to disk
    spv.onBlockTx(
      ({ transactions, header, started, finished, height, size }) => {
        for (const [index, transaction] of transactions) {
          console.log(
            `tx ${transaction
              .getHash()
              .toString("hex")} in index ${index} of block ${height}`
          );
        }
      }
    );
    console.log(`Listening for new blocks...`);

    // spv.onMempoolTx(({ transaction }) => {
    //   console.log(
    //     `tx ${transaction.getHash().toString("hex")} seen in mempool`
    //   );
    // });
    // console.log(`Listening for mempool txs...`);

    // console.log(`Syncing ${pruneBlocks} latest blocks...`);
    // await spv.syncAllBlocks();
    // console.log(`Synced all ${pruneBlocks} blocks!`);

    // height = 119990;
    // await spv.downloadBlock({ height });
    // await spv.readBlock(
    //   { height },
    //   ({ transaction, index, header, started, finished, size, height }) => {
    //     if (finished) {
    //       console.log(header, size);
    //     }
    //   }
    // );

    // await spv.warningPruneBlocks();
  } catch (err) {
    console.error(`Error`, err);
  }
})();
