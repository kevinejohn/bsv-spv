const BsvSpv = require("./spv");

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Worker Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Worker Uncaught Exception thrown");
  process.exit(1);
});

class Worker {
  constructor() {
    process.on("message", (msg) => {
      const obj = JSON.parse(msg);
      if (obj.command === "init") this.start(obj);
    });
  }

  async start(params) {
    const { node, mempool, blocks, forceUserAgent } = params;
    const REFRESH = 10; // console.log status every X seconds
    let interval;
    let txsSeen = 0;
    let txsSaved = 0;

    const id = `${mempool ? "mempool " : ""}${blocks ? "blocks " : ""}${node}`;

    let date = +new Date();
    const spv = new BsvSpv(params);
    this.spv = spv;

    let { height, hash } = spv.getTip();
    console.log(
      `${id} Loaded headers in ${
        (+new Date() - date) / 1000
      } seconds. Latest tip: ${height}, ${hash}`
    );
    spv.on("version", async ({ node, version }) => {
      console.log(`${id} version`, version);

      const newHeaders = await spv.syncHeaders();
      console.log(`${id} Synced ${newHeaders} new headers.`);

      if (blocks) {
        console.log(`${id} Syncing blocks...`);
        const newBlocks = await spv.syncBlocks();
        console.log(`${id} Synced ${newBlocks} new blocks.`);
      }
    });
    spv.once("version", () => {
      const seenNodes = spv.db_nodes.getSeenNodes();
      if (seenNodes.length === 0) {
        console.log(`${id} Getting node peers...`);
        spv.getNodePeers();
      }
    });
    spv.on("version_invalid", ({ user_agent, node }) => {
      console.error(
        `${id} has invalid user_agent: ${user_agent}. Will only connect to nodes that match "${forceUserAgent}"`
      );
    });
    spv.on("disconnected", ({ node, disconnects }) => {
      console.error(`${id} disconnected ${disconnects} times`);
      clearInterval(interval);

      process.send(
        JSON.stringify({
          command: `disconnected`,
          data: { node, disconnects, mempool: true },
        })
      );
    });
    spv.on("connected", async ({ node }) => {
      console.log(`${id} connected`);

      process.send(
        JSON.stringify({
          command: `connected`,
          data: { node, mempool: true },
        })
      );

      clearInterval(interval);
      if (mempool) {
        interval = setInterval(() => {
          console.log(
            `${id} seen: ${txsSeen}, saved: ${txsSaved} txs in ${REFRESH} seconds`
          );
          txsSeen = 0;
          txsSaved = 0;
        }, REFRESH * 1000);
      }
    });
    spv.on("node_peers", ({ addrs, nodes }) => {
      console.log(
        `${id} sent us ${nodes.length} new peers (${addrs.length} total)`
      );
    });
    spv.on("headers_new", ({ headers }) => {
      const { height, hash } = spv.getTip();
      console.log(
        `${id} ${headers.length} new headers. Tip: ${height}, ${hash}`
      );
    });
    spv.on("headers_saved", ({ hashes }) => {
      console.log(`${id} ${hashes.length} new headers saved to disk`);
      process.send(
        JSON.stringify({
          command: `headers_saved`,
          data: { hashes: hashes.map((h) => h.toString("hex")) },
        })
      );
    });
    spv.on("block_reorg", async ({ height, hash }) => {
      console.log(
        `${id} Re-org detected after block height ${height}, ${hash}!`
      );
      process.send(
        JSON.stringify({
          command: `block_reorg`,
          data: { hash, height },
        })
      );
      if (blocks) {
        await spv.syncHeaders();
        await spv.syncBlocks();
      }
    });
    spv.on("block_seen", async ({ hashes }) => {
      console.log(
        `${id} New block seen: ${hashes
          .map((h) => h.toString("hex"))
          .join(", ")}`
      );
      if (blocks) {
        await spv.syncHeaders();
        await spv.syncBlocks();
      }
    });
    spv.on("block_downloading", ({ hash, height }) => {
      console.log(`${id} Downloading block: ${height}, ${hash}...`);
    });

    if (mempool) {
      // Mempool events
      spv.on("mempool_pruned", ({ hashes, header, height }) => {
        if (!header) {
          console.log(`${id} Pruned ${hashes.length} mempool txs`);
        }
      });
      spv.on("mempool_tx", ({ transaction }) => {
        // console.log(
        //   `${id} tx ${transaction.getHash().toString("hex")} downloaded from mempool`
        // );
      });
      spv.on("mempool_txs_seen", ({ hashes }) => {
        // console.log(`${id} ${hashes.length} txs seen in mempool`);
        txsSeen += hashes.length;
      });
      spv.on("mempool_txs_saved", ({ hashes }) => {
        // console.log(`${id} ${hashes.length} new txs saved from mempool`);
        txsSaved += hashes.length;
        process.send(
          JSON.stringify({
            command: `mempool_txs_saved`,
            data: { hashes: hashes.map((h) => h.toString("hex")) },
          })
        );
      });
    }

    if (blocks) {
      spv.on("block_pruned", ({ height, hash }) => {
        console.log(`${id} Pruned block ${height}, ${hash}`);
      });
      spv.on("block_saved", ({ height, hash, size, txCount, startDate }) => {
        console.log(
          `${id} Downloaded block ${height}, ${hash}, ${txCount} txs, ${Number(
            size
          ).toLocaleString("en-US")} bytes in ${
            (+new Date() - startDate) / 1000
          } seconds.`
        );
        process.send(
          JSON.stringify({
            command: `block_saved`,
            data: { hash, height, size, txCount },
          })
        );
      });
      // spv.on(
      //   "block_txs",
      //   ({ transactions, header, started, finished, height, size }) => {
      //     for (const [index, transaction] of transactions) {
      //       console.log(
      //         `tx ${transaction
      //           .getHash()
      //           .toString("hex")} in index ${index} of block ${height}`
      //       );
      //     }
      //   }
      // );
    }

    console.log(`${id} Connecting to node...`);
    const options = {
      version: 70016, // >= 70016 for extmsg
      services: Buffer.from("0000000000000000", "hex"),
      // user_agent: '',
      start_height: height,
      relay: mempool ? Buffer.from([1]) : Buffer.from([0]),
    };
    await spv.connect(options);

    if (mempool) {
      await spv.pruneMempool(); // Delete old mempool txs if they exist
      spv.onMempoolTx(); // Download mempool txs
      console.log(`${id} Listening for mempool txs...`);
    }
    if (blocks) {
      await spv.warningPruneBlocks(); // Delete blocks older that the number of `pruneBlocks` from the tip
      // spv.onBlockTx(); // Download new blocks
      console.log(`${id} Listening for new blocks...`);
    }
  }
}

module.exports = Worker;
