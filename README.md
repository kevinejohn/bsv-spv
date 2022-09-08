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
await spv.syncHeaders(() => {
  console.log(
    `Synced ${spv.getHeight()} headers. Last hash: ${spv.getTip().hash}`
  );
});

console.log(spv.getHash(123000));
console.log(
  spv.getHeight(
    "00000000000069b73594b10aaa38beaeadc6d3f28cab8d76c4a6ac182694fd41"
  )
);
console.log(spv.getTip());
```

## Tests

`npm run test`
