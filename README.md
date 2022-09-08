# bsv-spv

[![NPM Package](https://img.shields.io/npm/v/bsv-spv.svg?style=flat-square)](https://www.npmjs.org/package/bsv-spv)

Stay in sync with latest bitcoin headers

## Install

```sh
npm i bsv-spv
```

## Use

```js
const BsvSpv = require("bsv-spv");

const ticker = "BSV"; // BTC, BCH, XEC, BSV
const node = `seed.satoshisvision.network:8333`; // Set to your favorite node IP address
const invalidBlocks = [];
const dataDir = __dirname;

const spv = new BsvSpv({ ticker, node, dataDir, invalidBlocks });
spv.peer.on("disconnected", () => {
  console.log(`Node ${ticker} ${node} disconnected.`);
});

await spv.connect();
await spv.syncHeaders(({ reorgTip }) => {
  if (reorgTip) {
    const { height, hash } = reorgTip;
    console.log(
      `Re-org detected after block height ${height}! Synced ${
        spv.getTip().height
      } headers. Last hash: ${spv.getTip().hash}`
    );
  } else {
    console.log(
      `Synced ${spv.getHeight()} headers. Last hash: ${spv.getTip().hash}`
    );
  }
});

console.log(spv.getHash(123000));
console.log(
  spv.getHeight(
    "00000000000069b73594b10aaa38beaeadc6d3f28cab8d76c4a6ac182694fd41"
  )
);
console.log(spv.getTip());
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
spv.peer.listenForTxs(); // Auto download new mempool transactions

////////////////////////////////
// Download all blocks
// Warning! It may take a while to download all blocks and will use the equivalent diskspace
////////////////////////////////

async function syncBlocks() {
  for (let height = spv.getHeight(); height > 0; height--) {
    const hash = spv.getHash(height);
    const dir = path.join(__dirname, `${hash.toString("hex")}.bin`);
    if (!fs.existsSync(dir)) {
      await spv.peer.getBlock(hash);
    }
  }
}

syncBlocks();
```

## Tests

`npm test`
