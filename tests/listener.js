const { Listener } = require("../src");
const path = require("path");

const ticker = "BSV";

const dataDir = path.join(__dirname, "data");
const listener = new Listener({ ticker, dataDir });

listener.on("headers_saved", ({ hashes }) => {
  const tip = listener.headers.getTip();
  console.log(`New headers loaded. Tip ${tip.height}, ${tip.hash}`);
});
listener.on("mempool_txs_saved", ({ hashes }) => {
  // console.log(`${hashes.length} new mempool txs`);
  // for (const hash of hashes) {
  //   const { tx, time } = listener.getMempoolTx(hash);
  //   console.log(`Mempool tx ${tx.getHash().toString("hex")}`);
  // }
});
listener.on("block_reorg", ({ height, hash }) => {
  console.log(`Block re-org after height ${height}, ${hash}!`);
});
listener.on("block_saved", ({ height, hash, txCount }) => {
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
          `Streamed block ${height} ${header
            .getHash()
            .toString("hex")}, ${transactions}, ${txCount} txs, ${Number(
            size
          ).toLocaleString("en-US")} bytes in ${
            (+new Date() - startDate) / 1000
          } seconds.`
        );
      }
    }
  );
});

listener.connect();
