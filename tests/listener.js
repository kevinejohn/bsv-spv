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

listener.on("headers_saved", ({ hashes }) => {});
listener.on("mempool_txs_saved", ({ hashes }) => {
  // console.log(`${hashes.length} new mempool txs`);
  // for (const hash of hashes) {
  //   const { tx, time } = listener.getMempoolTx(hash);
  //   console.log(`Mempool tx ${tx.getHash().toString("hex")}`);
  // }
});
listener.on("block_reorg", async ({ height, hash }) => {
  console.log(`Block re-org after height ${height}, ${hash}!`);
  await listener.syncBlocks(onBlock);
});
listener.on("block_saved", async ({ height, hash }) => {
  console.log(`New block saved ${height}, ${hash}`);
  await listener.syncBlocks(onBlock);
});

listener.syncBlocks();
listener.connect();
