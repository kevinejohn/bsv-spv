import Spv, { SpvOptions } from "./spv";
import cluster from "cluster";
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
      try {
        const msgs = message.toString().split("\n\n");
        for (const msg of msgs) {
          if (!msg.trim()) continue;
          const obj = JSON.parse(msg.trim());
          if (obj.command === "init") {
            this.start(obj).catch((err) => console.error(err));
          } else if (obj.command === "new_node") {
            const { node } = obj.data;
            this.spv?.disconnect();
            this.spv?.connect(node);
          }
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
    const { mempool, blocks, DEBUG_MEMORY } = config;
    const REFRESH = 10; // console.log status every 10 seconds
    let txsSeen = 0;
    let txsSaved = 0;
    let txsSize = 0;
    let blockInterval: NodeJS.Timer | undefined;
    let hasConnected = false;

    let date = +new Date();
    const spv = new Spv(config);
    this.spv = spv;

    if (DEBUG_MEMORY) {
      setInterval(() => {
        const m: any = process.memoryUsage();
        console.log(
          `${spv.id} Memory: ${Object.keys(m)
            .map((key: string) => `${key}: ${Helpers.formatBytes(m[key])}`)
            .join(", ")}`
        );
      }, 1000 * 60);
    }

    let { height, hash } = spv.getTip();
    console.log(
      `${spv.id} Loaded headers in ${
        (+new Date() - date) / 1000
      } seconds. Latest tip: ${height}, ${hash}`
    );
    spv.on("version", async ({ node, version }) => {
      console.log(`${spv.id} ${node} version`, version);

      try {
        const newHeaders = await spv.syncHeaders();
        console.log(`${spv.id} Synced ${newHeaders} new headers.`);

        if (blocks) {
          console.log(`${spv.id} Syncing blocks...`);
          const newBlocks = await spv.syncBlocks();
          console.log(`${spv.id} Synced ${newBlocks} new blocks.`);
        }
      } catch (err) {}
    });
    spv.on("version_invalid", ({ user_agent, expected_user_agent }) => {
      // console.error(
      //   `${spv.id} has invalid user_agent: ${user_agent}. Will only connect to nodes that match "${expected_user_agent}"`
      // );
      this.sendToMaster({ command: `send_new_node` });
    });
    let resetInterval: NodeJS.Timer;
    spv.on("disconnected", ({ node, disconnects }) => {
      if (hasConnected)
        console.error(`${spv.id} disconnected ${disconnects} times`);
      clearInterval(resetInterval);
      clearInterval(blockInterval);
      blockInterval = undefined;
      hasConnected = false;

      this.sendToMaster({
        command: `disconnected`,
        data: { node, disconnects },
      });
      if (disconnects >= 3) this.sendToMaster({ command: `send_new_node` });
    });
    spv.on("connected", async ({ node }) => {
      console.log(`${spv.id} connected at ${new Date().toLocaleString()}`);
      hasConnected = true;

      this.sendToMaster({
        command: `connected`,
        data: { node },
      });
      resetInterval = setInterval(() => {
        // Reset disconect count if connected for longer than a minute
        if (spv.isConnected() && spv.peer) {
          spv.peer.disconnects = 0;
        }
      }, 1000 * 60);
    });
    spv.on("node_peers", ({ addrs, nodes }) => {
      console.log(
        `${spv.id} sent us ${nodes.length} new peers (${addrs.length} total)`
      );
    });
    spv.on("headers_new", ({ headers }) => {
      const { height, hash } = spv.getTip();
      console.log(
        `${spv.id} ${
          headers.length
        } new headers. Tip: ${height}, ${hash} at ${new Date().toLocaleString()}`
      );
    });
    spv.on("headers_saved", ({ hashes }) => {
      console.log(
        `${spv.id} ${
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
        console.error(`${spv.id} peer_error`, error, buffer.toString("hex"));
      }
    );
    spv.on("block_reorg", async ({ height, hash }) => {
      console.log(
        `${
          spv.id
        } Re-org detected after block height ${height}, ${hash} at ${new Date().toLocaleString()}!`
      );
      this.sendToMaster({
        command: `block_reorg`,
        data: { hash, height },
      });
      if (blocks) {
        try {
          await spv.syncHeaders();
          await spv.syncBlocks();
        } catch (err) {
          // console.error(err);
        }
      }
    });
    spv.on("block_seen", async ({ hashes }) => {
      console.log(
        `${spv.id} New block seen: ${hashes
          .map((h: Buffer) => h.toString("hex"))
          .join(", ")} at ${new Date().toLocaleString()}`
      );
      if (blocks) {
        try {
          await spv.syncHeaders();
          await spv.syncBlocks();
        } catch (err) {
          // console.error(err);
        }
      }
    });
    // spv.on("block_downloading", ({ hash, height }) => {
    //   console.log(`${spv.id} Downloading block: ${height}, ${hash}...`);
    // });
    // spv.on("mempool_pruned", ({ header, height, finished, txCount }) => {
    //   if (!header) {
    //     console.log(`${spv.id} Pruned ${txCount} mempool txs`);
    //   } else {
    //     console.log(
    //       `${spv.id} Pruned ${txCount} mempool txs included in block ${height}`
    //     );
    //   }
    // });

    spv.on("mempool_txs_seen", ({ txids }) => {
      // console.log(`${spv.id} ${txids.length} txs seen in mempool`);
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
    spv.on("block_pruned", ({ height, hash }) => {
      console.log(`${spv.id} Pruned block ${height}, ${hash}`);
    });
    spv.on("block_saved", ({ height, hash, size, txCount, startDate }) => {
      const seconds = (+new Date() - startDate) / 1000;
      console.log(
        `${
          spv.id
        } Downloaded block ${height}/${spv.getHeight()}, ${hash}, ${txCount} txs in ${seconds} seconds. ${Helpers.formatSpeeds(
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
          `${
            spv.id
          } Downloaded block ${height}/${spv.getHeight()}, ${hash}, ${txCount} txs in ${seconds} seconds. ${Helpers.formatSpeeds(
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
            `${
              spv.id
            } downloading block ${height}/${spv.getHeight()} ${blockHash.toString(
              "hex"
            )} taking ${Number(seconds).toFixed(
              0
            )} seconds so far. ${Helpers.formatSpeeds(size, seconds)}`
          );
        }, 1000 * 10); // TODO: Change to 10 seconds
      }
      if (params.finished) {
        clearInterval(blockInterval);
        blockInterval = undefined;
      }
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

    setInterval(() => {
      if (!spv.isConnected()) {
        console.log(`${spv.id} is disconnected.`);
      } else if (mempool) {
        console.log(
          `${
            spv.id
          } is connected. ${txsSaved}/${txsSeen} txs. ${Helpers.formatSpeeds(
            txsSize,
            REFRESH
          )} `
        );
        txsSeen = 0;
        txsSaved = 0;
        txsSize = 0;
      } else if (blocks && !blockInterval) {
        console.log(`${spv.id} is connected. tip ${spv.headers.getHeight()}`);
      }
    }, REFRESH * 1000);

    console.log(`${spv.id} Connecting to node...`);
    await spv.connect();

    if (mempool) {
      // await spv.pruneMempool(); // Delete old mempool txs if they exist
      try {
        spv.onMempoolTx(); // Download mempool txs
        console.log(`${spv.id} Listening for mempool txs...`);
      } catch (err) {
        console.error(err);
      }

      // if (MEMPOOL_PRUNE_AFTER) {
      //   setInterval(() => {
      //     spv.pruneMempool().catch((err) => console.error(err));
      //   }, MEMPOOL_PRUNE_AFTER);
      // }
    }
    if (blocks) {
      try {
        await spv.warningPruneBlocks(); // Delete blocks older that the number of `pruneBlocks` from the tip
        spv.onBlockTx({ disableAutoDl: true }); // Prune mempool txs on block downloads
        console.log(`${spv.id} Listening for new blocks...`);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
