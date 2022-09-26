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
  transactions,
  startDate,
}: BlockStream) => {
  // for (const [index, tx, pos, len] of transactions) {
  //   console.log(
  //     `#${index} tx ${tx.getTxid()} in block ${height}`
  //   );
  // }
};

const onMempool = ({ txids }: { txids: string[] }) => {
  const { txs, size } = listener.getMempoolTxs(txids, false);
  console.log(
    `${txids.length} new mempool txs. ${size.toLocaleString("en-US")} bytes.`
  );
  for (const tx of txs) {
    console.log(`Mempool tx ${tx.getTxid()}`);
  }
};

listener.on("headers_saved", ({ hashes }: { hashes: string[] }) => {});
listener.on("mempool_txs_saved", ({ txids }: { txids: string[] }) => {
  // onMempool({ txids });
});
listener.on(
  "block_reorg",
  async ({ height, hash }: { height: number; hash: string }) => {
    // Re-org after height
  }
);
listener.on(
  "block_saved",
  async ({ height, hash }: { height: number; hash: string }) => {
    await listener.syncBlocks(onBlock);
  }
);

listener.connect({ port: 8080 });
listener.syncBlocks(onBlock);
