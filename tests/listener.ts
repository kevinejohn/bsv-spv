import { Listener } from "../src";
import path from "path";
import { BlockStream } from "bsv-minimal";

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
  txRead,
  transactions,
  startDate,
}: BlockStream) => {
  for (const [index, tx, pos, len] of transactions) {
    console.log(`#${index} tx ${tx.getTxid()} in block ${height}`);
  }
};

listener.on("headers_saved", ({ hashes }) => {});
listener.on("mempool_tx", ({ transaction }) => {
  console.log(
    `new mempool tx ${transaction.getTxid()} ${transaction.sizeTxOuts.toLocaleString(
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

listener.connect({ port: 8080 });
listener.syncBlocks(onBlock);
