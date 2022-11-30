# bsv-spv

[![NPM Package](https://img.shields.io/npm/v/bsv-spv.svg?style=flat-square)](https://www.npmjs.org/package/bsv-spv)

Stay in sync with latest bitcoin headers, blocks and mempool txs

## Install

```sh
npm i bsv-spv
```

### Docs

- [View TypeScript documentation here](docs/README.md)

## Use

### Listen to Bitcoin P2P network

```ts
const { Master, Worker } = require("bsv-spv");
const cluster = require("cluster");

const port = 8080; // Server that new blocks nad mempool txs are announced on

const config = {
  ticker: "BSV", // BTC, BCH, XEC, BSV
  nodes: [`95.217.197.54:8333`], // Set to your favorite node IP addresses. Will ask for other peers after connected
  // enableIpv6: true, // Connect to ipv6 nodes
  forceUserAgent: `Bitcoin SV`, // Disconnects with nodes that do not string match with user agent
  // user_agent: 'Bitcoin SV',
  invalidBlocks: [], // Set if you want to force a specific fork (see examples below)
  dataDir: __dirname, // Directory to store files
  pruneBlocks: 0, // Number of newest blocks you want saved to local disk. 0 to keeping all blocks back to genesis.
  blockHeight: -10, // Sync to block height. 0 to sync to genesis. Negative to sync to X blocks from current heightafter 2 hours
  mempool: 1, // Number of mempool tx threads
  blocks: 1, // Number of bitcoin block threads
};

if (cluster.isWorker) {
  const worker = new Worker();
} else if (cluster.isPrimary) {
  const master = new Master(config);
  master.startServer({ port });
}
```

### Listener process to read downloaded data from the Master process

```ts
const { Listener } = require("bsv-spv");

const name = "test-plugin";
const ticker = "BSV";
const blockHeight = -10; // Number. If negative then it's number from the tip.
const dataDir = __dirname;
const port = 8080; // Same as Masters port above
const listener = new Listener({ name, ticker, blockHeight, dataDir });

const onBlock = ({
  header,
  started,
  finished,
  size,
  height,
  txCount,
  transactions,
  startDate,
}) => {
  for (const [index, tx, pos, len] of transactions) {
    console.log(`#${index} tx ${tx.getTxid()} in block ${height}`);
  }
};

listener.on("mempool_tx", ({ transaction, size }) => {
  console.log(
    `new mempool tx ${transaction.getTxid()} ${size.toLocaleString(
      "en-US"
    )} bytes.`
  );
});
listener.on("block_reorg", ({ height, hash }) => {
  // Re-org after height
});
listener.on("block_saved", ({ height, hash }) => {
  listener.syncBlocks(onBlock);
});

listener.syncBlocks(onBlock);
listener.connect({ port });
```

### Serve txs from express server

```ts
const { Server } = require("bsv-spv");

const name = "test-server";
const ticker = "BSV";
const dataDir = __dirname;
const port = 8080; // Same as Masters port above
const server = new Server({ name, ticker, dataDir });
server.connect({ port });
server.listen({ port: 8081 }); // Express server to server txs

// Get tx from block
// wget 'http://localhost:8081/txid/11bcd81b9c0d9082799e83b29617c1d3e2d663ef4351754c40c5efa0f33e2e91?block=00000000000000000a62b5c6a75e5c24f8bdb1f21501ee5651a09d11ecaaadca&len=173&pos=81'
// or
// wget 'http://localhost:8081/txid/11bcd81b9c0d9082799e83b29617c1d3e2d663ef4351754c40c5efa0f33e2e91?height=757931&len=173&pos=81'

// Get tx from mempool
// wget 'http://localhost:8081/txid/11bcd81b9c0d9082799e83b29617c1d3e2d663ef4351754c40c5efa0f33e2e91'
```

### Forcing specific forks with headers

Set `invalidBlocks` to the desired fork you wish to use. It will invalidate any other chain listed.

```ts
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

```sh
ts-node ./tests/cluster.js
```

```sh
ts-node ./tests/listener.js
```

```sh
ts-node ./tests/server.js
```
