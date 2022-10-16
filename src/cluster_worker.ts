import Spv, { SpvOptions } from "./spv";
import * as Helpers from "./helpers";

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, "Worker Unhandled Rejection at Promise", p);
});
process.on("uncaughtException", (err) => {
  console.error(err, "Worker Uncaught Exception thrown");
  process.exit(1);
});

export default class Worker {
  spv?: Spv;

  constructor() {
    process.on("message", (message: any) => {
      // TODO: Fix
      try {
        const msgs = message.toString().split("\n\n");
        for (const msg of msgs) {
          if (!msg.trim()) continue;
          const obj = JSON.parse(msg.trim());
          if (obj.command === "init")
            this.start(obj).catch((err) => console.error(err));
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  sendToMaster(obj: any) {
    if (process.send) process.send(`${JSON.stringify(obj)}\n\n`);
  }

  async start(config: SpvOptions) {
    const { mempool, blocks, MEMPOOL_PRUNE_AFTER, DEBUG_MEMORY } = config;
    const REFRESH = 10; // console.log status every 10 seconds
    let interval: NodeJS.Timer;
    let txsSeen = 0;
    let txsSaved = 0;
    let txsSize = 0;
    let blockInterval: NodeJS.Timer;

    let date = +new Date();
    const spv = new Spv(config);
    this.spv = spv;
    const id = spv.id;

    if (DEBUG_MEMORY) {
      setInterval(() => {
        const m: any = process.memoryUsage();
        console.log(
          `${id} Memory: ${Object.keys(m)
            .map((key: string) => `${key}: ${Helpers.formatBytes(m[key])}`)
            .join(", ")}`
        );
      }, 1000 * 60);
    }

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
    // spv.once("version", () => {
    //   const seenNodes = spv.db_nodes.getSeenNodes();
    //   if (seenNodes.length === 0) {
    //     console.log(`${id} Getting node peers...`);
    //     spv.getNodePeers();
    //   }
    // });
    spv.on("version_invalid", ({ user_agent, expected_user_agent }) => {
      console.error(
        `${id} has invalid user_agent: ${user_agent}. Will only connect to nodes that match "${expected_user_agent}"`
      );
    });
    spv.on("disconnected", ({ node, disconnects }) => {
      console.error(`${id} disconnected ${disconnects} times`);
      clearInterval(interval);
      clearInterval(blockInterval);

      this.sendToMaster({
        command: `disconnected`,
        data: { node, disconnects },
      });
    });
    spv.on("connected", async ({ node }) => {
      console.log(`${id} connected at ${new Date().toLocaleString()}`);

      this.sendToMaster({
        command: `connected`,
        data: { node },
      });

      clearInterval(interval);
      clearInterval(blockInterval);
      if (mempool) {
        interval = setInterval(() => {
          console.log(
            `${id} ${txsSaved} mempool txs in ${REFRESH} seconds. ${Helpers.formatSpeeds(
              txsSize,
              REFRESH
            )} (seen ${txsSeen})`
          );
          txsSeen = 0;
          txsSaved = 0;
          txsSize = 0;
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
        `${id} ${
          headers.length
        } new headers. Tip: ${height}, ${hash} at ${new Date().toLocaleString()}`
      );
    });
    spv.on("headers_saved", ({ hashes }) => {
      console.log(
        `${id} ${
          hashes.length
        } new headers saved to disk at ${new Date().toLocaleString()}`
      );
      this.sendToMaster({
        command: `headers_saved`,
        data: { hashes: hashes.map((h: Buffer) => h.toString("hex")) },
      });
    });
    spv.on(
      "peer_error",
      ({ error, buffer }: { error: any; buffer: Buffer }) => {
        console.error(`${id} peer_error`, error, buffer.toString("hex"));
      }
    );
    spv.on("block_reorg", async ({ height, hash }) => {
      console.log(
        `${id} Re-org detected after block height ${height}, ${hash} at ${new Date().toLocaleString()}!`
      );
      this.sendToMaster({
        command: `block_reorg`,
        data: { hash, height },
      });
      if (blocks) {
        await spv.syncHeaders();
        await spv.syncBlocks();
      }
    });
    spv.on("block_seen", async ({ hashes }) => {
      console.log(
        `${id} New block seen: ${hashes
          .map((h: Buffer) => h.toString("hex"))
          .join(", ")} at ${new Date().toLocaleString()}`
      );
      if (blocks) {
        await spv.syncHeaders();
        await spv.syncBlocks();
      }
    });
    spv.on("block_downloading", ({ hash, height }) => {
      // console.log(`${id} Downloading block: ${height}, ${hash}...`);
    });
    // spv.on("mempool_pruned", ({ header, height, finished, txCount }) => {
    //   if (!header) {
    //     console.log(`${id} Pruned ${txCount} mempool txs`);
    //   } else {
    //     console.log(
    //       `${id} Pruned ${txCount} mempool txs included in block ${height}`
    //     );
    //   }
    // });

    if (mempool) {
      spv.on("mempool_txs_seen", ({ txids }) => {
        // console.log(`${id} ${txids.length} txs seen in mempool`);
        txsSeen += txids.length;
      });
      spv.on("mempool_tx", ({ transaction }) => {
        txsSaved++;
        txsSize += transaction.length;
        this.sendToMaster({
          command: `mempool_tx`,
          data: {
            transaction: transaction.toBuffer().toString("base64"),
            size: transaction.length,
          },
        });
      });
    }

    spv.on("block_pruned", ({ height, hash }) => {
      console.log(`${id} Pruned block ${height}, ${hash}`);
    });
    spv.on("block_saved", ({ height, hash, size, txCount, startDate }) => {
      const seconds = (+new Date() - startDate) / 1000;
      console.log(
        `${id} Downloaded block ${height}/${spv.getHeight()}, ${hash}, ${txCount} txs in ${seconds} seconds. ${Helpers.formatSpeeds(
          size,
          seconds
        )}. ${new Date().toLocaleString()}`
      );
      this.sendToMaster({
        command: `block_saved`,
        data: { hash, height, size, txCount },
      });
    });
    spv.on(
      "block_already_saved",
      ({ height, hash, size, txCount, startDate }) => {
        const seconds = (+new Date() - startDate) / 1000;
        console.log(
          `${id} Downloaded block ${height}/${spv.getHeight()}, ${hash}, ${txCount} txs in ${seconds} seconds. ${Helpers.formatSpeeds(
            size,
            seconds
          )}. Block already saved. ${new Date().toLocaleString()}`
        );
      }
    );
    let chunkParams: any;
    spv.on("block_chunk", (params) => {
      chunkParams = params;
      if (params.started) {
        clearInterval(blockInterval);
        blockInterval = setInterval(() => {
          const { blockHash, height, size, startDate } = chunkParams;
          const seconds = (+new Date() - startDate) / 1000;
          console.log(
            `${id} downloading block ${height}/${spv.getHeight()} ${blockHash.toString(
              "hex"
            )} taking ${Number(seconds).toFixed(
              0
            )} seconds so far. ${Helpers.formatSpeeds(size, seconds)}`
          );
        }, 1000 * 10); // TODO: Change to 10 seconds
      }
      if (params.finished) clearInterval(blockInterval);
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

    console.log(`${id} Connecting to node...`);
    await spv.connect();

    if (mempool) {
      // await spv.pruneMempool(); // Delete old mempool txs if they exist
      spv.onMempoolTx(); // Download mempool txs
      console.log(`${id} Listening for mempool txs...`);

      // if (MEMPOOL_PRUNE_AFTER) {
      //   setInterval(() => {
      //     spv.pruneMempool().catch((err) => console.error(err));
      //   }, MEMPOOL_PRUNE_AFTER);
      // }
    }
    if (blocks) {
      await spv.warningPruneBlocks(); // Delete blocks older that the number of `pruneBlocks` from the tip
      spv.onBlockTx({ disableAutoDl: true }); // Prune mempool txs on block downloads
      console.log(`${id} Listening for new blocks...`);
    }
  }
}
