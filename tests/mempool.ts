import { DbMempool } from "../src";
import path from "path";

const mempoolDir = path.join(__dirname, "data/BSV/mempool");
const db = new DbMempool({ mempoolDir });

async function main() {
  const hashes = await db.getTxids({});
  let size = 0;
  for (const hash of hashes) {
    const tx = await db.getTx(hash);
    size += tx.size;
  }
  console.log(
    `${hashes.length} txs in mempool db. ${Number(size).toLocaleString(
      "en-US"
    )} bytes total`
  );
  await db.close();
}

main().catch((err) => {
  console.error(err);
  db.close().finally(() => process.exit(1));
});
