const { Listener } = require("../src");
const path = require("path");

const name = "test-plugin";
const ticker = "BSV";
const blockHeight = -10; // Number. If negative then it's number from the tip.

const dataDir = path.join(__dirname, "data");
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
  // for (const [index, tx] of transactions) {
  //   console.log(
  //     `#${index} tx ${tx.getHash().toString("hex")} in block ${height}`
  //   );
  // }
};

const onMempool = ({ hashes }) => {
  const { txs, size } = listener.getMempoolTxs(hashes);
  console.log(
    `${hashes.length} new mempool txs. ${size.toLocaleString("en-US")} bytes.`
  );
  for (const tx of txs) {
    console.log(`Mempool tx ${tx.getHash().toString("hex")}`);
  }
};

listener.on("headers_saved", ({ hashes }) => {});
listener.on("mempool_txs_saved", ({ hashes }) => {
  // onMempool({ hashes });
});
listener.on("block_reorg", async ({ height, hash }) => {
  // Re-org after height
});
listener.on("block_saved", async ({ height, hash }) => {
  await listener.syncBlocks(onBlock);
});

listener.connect();
listener.syncBlocks(onBlock);
