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
  await spv.syncHeaders(() => {
    console.log(
      `Synced ${spv.getHeight()} headers. Last hash: ${spv.getTip().hash}`
    );
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
})();
