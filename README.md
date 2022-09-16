# bsv-spv

[![NPM Package](https://img.shields.io/npm/v/bsv-spv.svg?style=flat-square)](https://www.npmjs.org/package/bsv-spv)

Stay in sync with latest bitcoin headers

## Install

```sh
npm i bsv-spv
```

## Use

```js
const { Master, Worker } = require("bsv-spv");
const cluster = require("cluster");

const port = 8080; // Server that new blocks nad mempool txs are announced on

const config = {
  ticker: "BSV", // BTC, BCH, XEC, BSV
  nodes: [`seed.satoshisvision.network:8333`], // Set to your favorite node IP addresses
  forceUserAgent: `Bitcoin SV`, // Disconnects with nodes that do not string match with user agent
  invalidBlocks: [], // Set if you want to force a specific fork (see examples below)
  dataDir: __dirname, // Directory to store files
  pruneBlocks: 0, // Number of newest blocks you want saved to local disk. 0 to keeping all blocks back to genesis.
  blockHeight: -1, // Sync to block height. 0 to sync to genesis. Negative to sync to X blocks from current height
};

if (cluster.isWorker) {
  const worker = new Worker();
} else if (cluster.isPrimary) {
  const master = new Master(config);
  master.startServer({ port });
}
```

### Listen to mempool and block transactions from other processes

```js
const { Listener } = require("bsv-spv");

const ticker = "BSV"; // Must use same ticker as above
const dataDir = __dirname; // Must use same dataDir as above
const port = 8080; // Must use the same port as above
const listener = new Listener({ ticker, port, dataDir });

listener.on("headers_saved", ({ hashes }) => {
  const tip = listener.headers.getTip();
  console.log(`New headers loaded. Tip ${tip.height}, ${tip.hash}`);
});
listener.on("mempool_txs_saved", ({ hashes }) => {
  console.log(`${hashes.length} new mempool txs`);
  // for (const hash of hashes) {
  //   const { tx, time } = listener.getMempoolTx(hash);
  //   console.log(`Mempool tx ${tx.getHash().toString("hex")}`);
  // }
});
listener.on("block_reorg", ({ height, hash }) => {
  console.log(`Block re-org after height ${height}, ${hash}!`);
});
listener.on("block_saved", ({ height, hash }) => {
  console.log(`New block saved ${height}, ${hash}`);
  listener.readBlock(
    { hash, height },
    ({ header, started, finished, size, height, transactions, startDate }) => {
      if (started) {
        console.log(
          `Streaming block ${height}, ${header.getHash().toString("hex")}...`
        );
      }
      for (const [index, tx] of transactions) {
        // console.log(
        //   `#${index} tx ${tx.getHash().toString("hex")} in block ${height}`
        // );
      }
      if (finished) {
        console.log(
          `Streamed block ${height} ${header.getHash().toString("hex")} in ${
            (+new Date() - startDate) / 1000
          } seconds.`
        );
      }
    }
  );
});

listener.connect();
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
