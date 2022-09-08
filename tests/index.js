const BsvSpv = require("../src");
const path = require("path");
const assert = require("assert");

const ticker = "BSV";
const node = `18.192.253.59:8333`;
const invalidBlocks = [];
const dataDir = path.join(__dirname);

(async () => {
  let date = +new Date();
  const spv = new BsvSpv({ ticker, node, dataDir, invalidBlocks });
  console.log(
    `Loaded ${spv.getHeight()} headers in ${
      (+new Date() - date) / 1000
    } seconds. Last hash: ${spv.getTip().hash}`
  );
  spv.peer.on("disconnected", () => {
    console.log(`Node ${ticker} ${node} disconnected.`);
  });
  console.log(`Connecting to ${ticker} node ${node}...`);
  await spv.connect();
  console.log(`Connected to ${ticker} ${node}!`);
  console.log(`Syncing headers...`);
  await spv.syncHeaders(({ reorgTip }) => {
    if (reorgTip) {
      const { height, hash } = reorgTip;
      console.log(
        `Re-org detected after block height ${height}! Synced ${spv.getHeight()} headers. Last hash: ${
          spv.getTip().hash
        }`
      );
    } else {
      console.log(
        `Synced ${spv.getHeight()} headers. Last hash: ${spv.getTip().hash}`
      );
    }
  });

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

  console.log(spv.getHeader({ height: 123000 }));

  //////////////////////////////////////////
  // Download all new blocks and mempool txs
  //////////////////////////////////////////

  const fs = require("fs");
  const path = require("path");
  let writeStream;

  spv.peer.on(
    "block_chunk",
    ({ node, chunk, blockHash, finished, started, num }) => {
      // Save blocks to disk
      const dir = path.join(__dirname, `${blockHash.toString("hex")}.bin`); // Path of final block file
      if (started) writeStream = fs.createWriteStream(`${dir}.tmp`);

      writeStream.write(chunk);

      if (finished) {
        writeStream.end();
        writeStream = null;
        fs.renameSync(`${dir}.tmp`, dir);
      }
    }
  );

  spv.peer.on("transactions", ({ node, header, finished, transactions }) => {
    // `header` if transaction is confirmed in a block. Otherwise it is a mempool tx
    // `finished` is true if these are the last transactions in a block
    for (const [index, transaction] of transactions) {
      // index: is the transaction index number in the block if header exists
      // transaction: is a bsv-minimal lib object
      if (header) {
        console.log(
          `tx ${transaction
            .getHash()
            .toString("hex")} in index ${index} of block ${header
            .getHash()
            .toString("hex")}`
        );
      } else {
        console.log(
          `tx ${transaction.getHash().toString("hex")} seen in mempool`
        );
      }
    }
  });

  spv.peer.listenForBlocks(); // Auto downloads new blocks seen
  // spv.peer.listenForTxs(); // Auto download new mempool transactions
})();
