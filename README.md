# bsv-spv

[![NPM Package](https://img.shields.io/npm/v/bsv-spv.svg?style=flat-square)](https://www.npmjs.org/package/bsv-spv)

Stay in sync with latest bitcoin headers

## Install

```sh
npm i bsv-spv
```

## Use

```js
const assert = require("assert");
const { BsvSpv } = require("bsv-spv");

const ticker = "BSV"; // BTC, BCH, XEC, BSV
const node = `seed.satoshisvision.network:8333`; // Set to your favorite node IP address
const pruneBlocks = 3; // Number of newest blocks you want saved to local disk. 0 to keeping all blocks back to genesis.
const invalidBlocks = []; // Set if you want to force a specific fork (see examples below)
const forceUserAgent = `Bitcoin SV`;
const dataDir = path.join(__dirname, "data");
const blockHeight = -1; // Sync to block height

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
    const newHeaders = await spv.syncHeaders();
    console.log(`Synced ${newHeaders} new headers.`);

    console.log(`Syncing latest blocks...`);
    const newBlocks = await spv.syncBlocks();
    console.log(`Synced ${newBlocks} new blocks.`);
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
  spv.on("headers_saved", ({ hashes }) => {
    console.log(`${hashes.length} new headers saved to disk`);
  });

  spv.peer.on("error_socket", (err) => {
    console.log(`${node} peer socket error`, err);
  });

  // Block events
  spv.on("block_reorg", ({ height, hash }) => {
    console.log(`Re-org detected after block height ${height}, ${hash}!`);
    spv.syncBlocks(); // Re-sync blocks
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
    "block_txs",
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
    // console.log(
    //   `Pruned ${hashes.length} mempool txs ${
    //     header ? `after seen in block ${height}` : ""
    //   }`
    // );
  });
  spv.on("mempool_tx", ({ transaction }) => {
    // console.log(
    //   `tx ${transaction.getHash().toString("hex")} downloaded from mempool`
    // );
  });
  spv.on("mempool_txs_seen", ({ hashes }) => {
    // console.log(`${hashes.length} txs seen in mempool`);
  });
  spv.on("mempool_txs_saved", ({ hashes }) => {
    // console.log(`${hashes.length} new txs saved from mempool`);
  });
  spv.on("node_peers", ({ nodes }) => {
    console.log(`Node ${node} has ${nodes.length} peers`);
  });

  await spv.warningPruneBlocks();
  spv.onBlockTx(); // Download blocks
  console.log(`Listening for new blocks...`);

  await spv.pruneMempool(); // Delete old mempool txs if they exist
  spv.onMempoolTx(); // Download mempool txs
  console.log(`Listening for mempool txs...`);

  spv.once("version", () => {
    // Run only once
    console.log(`Getting node peers...`);
    spv.getNodePeers();
  });

  console.log(`Connecting to ${ticker} node ${node}...`);
  await spv.connect();

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

  // Download specific block example
  height = 119990;
  await spv.downloadBlock(height); // Transactions will come through `onBlockTx`. Returns false if block is already saved to disk
  // Streams locally saved block from disk. No memory constraints
  await spv.readBlock(
    { height },
    ({ transaction, index, header, started, finished, size, height }) => {
      if (finished) {
        console.log(header, size);
      }
    }
  );
})();
```

### Forcing specific forks with headers

Set `invalidBlocks` to the desired fork you wish to use. It will invalidate any other chain listed.

```js
let invalidBlocks;

// Use BSV only
invalidBlocks = [
  "00000000000000000019f112ec0a9982926f1258cdcc558dd7c3b7e5dc7fa148", // BTC fork 478559
  "0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c", // BCH fork 556767
];

// Use BTC only
invalidBlocks = [
  "000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec", // BCH fork 478559
];

// Use BCH only
invalidBlocks = [
  "00000000000000000019f112ec0a9982926f1258cdcc558dd7c3b7e5dc7fa148", // BTC fork 478559
  "000000000000000001d956714215d96ffc00e0afda4cd0a96c96f8d802b1662b", // BSV fork 556767
  "000000000000000004284c9d8b2c8ff731efeaec6be50729bdc9bd07f910757d", // XEC fork 661648
];

// Use XEC only
invalidBlocks = [
  "00000000000000000019f112ec0a9982926f1258cdcc558dd7c3b7e5dc7fa148", // BTC fork 478559
  "000000000000000001d956714215d96ffc00e0afda4cd0a96c96f8d802b1662b", // BSV fork 556767
  "0000000000000000029e471c41818d24b8b74c911071c4ef0b4a0509f9b5a8ce", // BCH fork 661648
];
```

## Tests

`npm test`
