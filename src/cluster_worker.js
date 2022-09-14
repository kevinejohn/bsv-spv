const BsvSpv = require("./spv");
const EventEmitter = require("events");

class Worker extends EventEmitter {
  constructor(params) {
    super();
    this.params = params;
    this.node = params.node;
  }

  async start({ mempool, blocks }) {
    const REFRESH = 10; // console.log status every X seconds
    let interval;
    let txsSeen = 0;
    let txsSaved = 0;

    const id = `${mempool ? "mempool " : ""}${blocks ? "blocks " : ""}${
      this.node
    }`;

    let date = +new Date();
    const spv = new BsvSpv(this.params);
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
      console.log(`${id} Getting node peers...`);
      spv.getNodePeers();
    });
    spv.on("version_invalid", ({ user_agent, node }) => {
      console.error(
        `${id} has invalid user_agent: ${user_agent}. Will only connect to nodes that match "${this.params.forceUserAgent}"`
      );
    });
    spv.on("disconnected", ({ node, disconnects }) => {
      console.error(`${id} disconnected ${disconnects} times`);
      clearInterval(interval);

      this.emit(
        `message`,
        JSON.stringify({
          command: `disconnected`,
          data: { node, disconnects, mempool: true },
        })
      );
    });
    spv.on("connected", async ({ node }) => {
      console.log(`${id} connected`);

      this.emit(
        `message`,
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
      this.emit(
        `message`,
        JSON.stringify({
          command: `headers_saved`,
          data: { hashes: hashes.map((h) => h.toString("hex")) },
        })
      );
    });
    spv.on("block_reorg", ({ height, hash }) => {
      console.log(
        `${id} Re-org detected after block height ${height}, ${hash}!`
      );
      this.emit(
        `message`,
        JSON.stringify({
          command: `block_reorg`,
          data: { hash, height },
        })
      );
      if (blocks) spv.syncBlocks(); // Re-sync blocks
    });
    spv.on("block_seen", ({ hashes }) => {
      console.log(
        `${id} New block seen: ${hashes
          .map((h) => h.toString("hex"))
          .join(", ")}`
      );
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
        this.emit(
          `message`,
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
      spv.on("block_saved", ({ height, hash, size, startDate }) => {
        console.log(
          `${id} Downloaded block ${height}, ${hash}, ${Number(
            size
          ).toLocaleString("en-US")} bytes in ${
            (+new Date() - startDate) / 1000
          } seconds.`
        );
        this.emit(
          `message`,
          JSON.stringify({
            command: `block_saved`,
            data: { hash, height },
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
    await spv.connect();

    if (mempool) {
      await spv.pruneMempool(); // Delete old mempool txs if they exist
      spv.onMempoolTx(); // Download mempool txs
      console.log(`${id} Listening for mempool txs...`);
    }
    if (blocks) {
      await spv.warningPruneBlocks(); // Delete blocks older that the number of `pruneBlocks` from the tip
      spv.onBlockTx(); // Download new blocks
      console.log(`${id} Listening for new blocks...`);
    }
  }
}

module.exports = Worker;