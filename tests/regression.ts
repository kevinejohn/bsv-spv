import assert from "assert/strict";
import EventEmitter from "events";
import fs from "fs";
import * as Http from "http";
import { AddressInfo } from "net";
import os from "os";
import path from "path";
import * as bsv from "bsv-minimal";
import Headers from "bsv-headers";
import Master from "../src/cluster_master";
import DbBlocks from "../src/db_blocks";
import DbHeaders from "../src/db_headers";
import DbMempool from "../src/db_mempool";
import DbNodes, { backoffDelay } from "../src/db_nodes";
import Spv from "../src/spv";
import Server from "../src/server";

async function withTempDir(
  name: string,
  callback: (dir: string) => Promise<void>
) {
  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), name));
  try {
    await callback(dir);
  } finally {
    await fs.promises.rm(dir, { recursive: true, force: true });
  }
}

function mempoolValue(time: number, payload: Buffer) {
  const bw = new bsv.utils.BufferWriter();
  bw.writeVarintNum(time);
  bw.writeVarLengthBuffer(payload);
  return bw.toBuffer();
}

function putMempool(db: DbMempool, key: Buffer, value: Buffer) {
  db.dbi_txs.transactionSync(() => {
    db.dbi_txs.put(key, value);
  });
  return Promise.resolve();
}

const GENESIS_TX_HEX =
  "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000";

function genesisTx() {
  return bsv.Transaction.fromBuffer(Buffer.from(GENESIS_TX_HEX, "hex"));
}

async function testMempoolPruneKeepsFreshTxs() {
  await withTempDir("bsv-spv-mempool-", async (dir) => {
    const db = new DbMempool({ mempoolDir: dir });
    const oldKey = Buffer.alloc(32, 1);
    const freshKey = Buffer.alloc(32, 2);
    const now = +new Date();
    const cutoff = now - 1000;

    await putMempool(
      db,
      oldKey,
      mempoolValue(now - 10_000, Buffer.from([1]))
    );
    await putMempool(db, freshKey, mempoolValue(now, Buffer.from([2])));

    const prunable = await db.getTxids({ olderThan: cutoff });
    assert.deepEqual(
      prunable.map((txid) => txid.toString("hex")),
      [oldKey.toString("hex")]
    );

    await db.pruneTxs(cutoff);
    const remaining = await db.getTxids({});
    assert.deepEqual(
      remaining.map((txid) => txid.toString("hex")),
      [freshKey.toString("hex")]
    );

    await db.close();
  });
}

async function testMempoolCloseFlushesPendingBatchAndClearsIntervals() {
  await withTempDir("bsv-spv-mempool-close-", async (dir) => {
    const tx = genesisTx();
    const db = new DbMempool({ mempoolDir: dir });

    db.saveTx(tx);
    assert.notEqual(db.intervalBatch, undefined);
    assert.notEqual(db.intervalPrune, undefined);
    await db.close();
    assert.equal(db.intervalBatch, undefined);
    assert.equal(db.intervalPrune, undefined);
    await db.close(); // close must be idempotent

    const reopened = new DbMempool({ mempoolDir: dir });
    const saved = await reopened.getTx(tx.getTxid());
    assert.equal(saved.tx.getTxid(), tx.getTxid());
    await reopened.close();
  });
}

async function testDelBlockClearsStaleSavedMarker() {
  await withTempDir("bsv-spv-blocks-", async (dir) => {
    const db = new DbBlocks({ blocksDir: dir, readOnly: false });
    const hash = "00".repeat(32);

    await db.markBlockSaved(hash);
    await db.dbi_blocks.flushed;
    assert.equal(db.blockExists(hash), true);

    await db.delBlock(hash);
    await db.dbi_blocks.flushed;
    assert.equal(db.blockExists(hash), false);

    await db.close();
  });
}

async function testBlacklistUsesRollingExpiry() {
  await withTempDir("bsv-spv-nodes-", async (dir) => {
    const db = new DbNodes({
      nodesDir: dir,
      blacklistTime: 1000,
      readOnly: false,
    });
    const node = "127.0.0.1";
    const port = 8333;
    const url = db.formatUrl({ node, port });

    db.dbi_blacklisted.put(url, Math.round((+new Date() - 2000) / 1000));
    await db.dbi_blacklisted.flushed;
    assert.equal(db.isBlacklisted({ node, port }), false);

    db.dbi_blacklisted.put(url, Math.round(+new Date() / 1000));
    await db.dbi_blacklisted.flushed;
    assert.equal(db.isBlacklisted({ node, port }), true);

    await db.close();
  });
}

function makeNodeMaster(
  db: DbNodes,
  seeds: string[],
  opts: Partial<{
    nodeBackoffBase: number;
    nodeBackoffMax: number;
    nodeStableTime: number;
    blocks: number;
    mempool: number;
  }> = {}
) {
  const master: any = Object.create(Master.prototype);
  master.db_nodes = db;
  master.seed_nodes = seeds;
  master.seedNodesOnly = false;
  master.block_nodes = new Set<string>();
  master.mempool_nodes = new Set<string>();
  master.queue_block_nodes = [];
  master.queue_mempool_nodes = [];
  master.mempool = opts.mempool ?? 1;
  master.blocks = opts.blocks ?? 1;
  master.nodeBackoffBase = opts.nodeBackoffBase ?? 10000;
  master.nodeBackoffMax = opts.nodeBackoffMax ?? 600000;
  master.nodeStableTime = opts.nodeStableTime ?? 60000;
  return master;
}

function testBackoffDelayEscalatesAndCaps() {
  assert.equal(backoffDelay(0, 10000, 600000), 0);
  assert.equal(backoffDelay(1, 10000, 600000), 10000);
  assert.equal(backoffDelay(2, 10000, 600000), 20000);
  assert.equal(backoffDelay(3, 10000, 600000), 40000);
  assert.equal(backoffDelay(64, 10000, 600000), 600000, "capped at max");
  assert.equal(backoffDelay(1000, 10000, 600000), 600000, "no overflow");
  assert.equal(backoffDelay(5, 0, 600000), 0, "disabled when base is 0");
}

async function testNodeFailureBackoffPersistsAndExpires() {
  await withTempDir("bsv-spv-attempts-", async (dir) => {
    const node = "127.0.0.1:8333";
    const base = 10000;
    const db = new DbNodes({ nodesDir: dir, readOnly: false });

    assert.equal(
      db.getBackoffRemaining({ node }, { base, max: 600000 }),
      0,
      "unknown node is eligible"
    );

    const t0 = 1_000_000;
    const first = db.recordFailure({ node }, { now: t0 });
    assert.equal(first.count, 1);
    assert.equal(
      db.getBackoffRemaining({ node }, { base, max: 600000, now: t0 }),
      base,
      "first failure waits the base delay"
    );

    const second = db.recordFailure({ node }, { now: t0 + base });
    assert.equal(second.count, 2);
    assert.equal(
      db.getBackoffRemaining({ node }, { base, max: 600000, now: t0 + base }),
      base * 2,
      "second failure doubles the delay"
    );

    assert.equal(
      db.getBackoffRemaining(
        { node },
        { base, max: 600000, now: t0 + base + base * 2 }
      ),
      0,
      "cooldown expires"
    );

    await db.close();

    // The cooldown must survive a restart so a master bounce does not
    // immediately re-hammer a host that was just failing.
    const reopened = new DbNodes({ nodesDir: dir, readOnly: false });
    assert.equal(
      reopened.getAttempt({ node })?.count,
      2,
      "failure streak is persisted"
    );
    await reopened.close();
  });
}

function testAttemptKeyIncludesPort() {
  const db = new DbNodes({
    nodesDir: fs.mkdtempSync(path.join(os.tmpdir(), "bsv-spv-portkey-")),
    readOnly: false,
  });
  // bsv-p2p reports `disconnected` with the port stripped. The master must key
  // the cooldown on the exact string it handed out, otherwise a cooling host
  // still looks eligible and gets retried instantly.
  db.recordFailure({ node: "1.2.3.4:8333" }, { stableTime: 60000 });
  assert.ok(db.getBackoffRemaining({ node: "1.2.3.4:8333" }, { base: 10000, max: 600000 }) > 0);
  assert.equal(
    db.getBackoffRemaining({ node: "1.2.3.4" }, { base: 10000, max: 600000 }),
    0,
    "port-stripped host is a different key"
  );
  db.close();
}

function testStableConnectionResetsFailureStreak() {
  const db = new DbNodes({
    nodesDir: fs.mkdtempSync(path.join(os.tmpdir(), "bsv-spv-stable-")),
    readOnly: false,
  });
  const node = "10.0.0.1:8333";
  const now = 2_000_000;
  const stableTime = 60000;

  db.recordFailure({ node }, { now, stableTime });
  db.recordFailure({ node }, { now: now + 1, stableTime });
  assert.equal(db.getAttempt({ node })?.count, 2);

  // Connected and held for longer than `stableTime`: treat the next failure
  // as a fresh one instead of escalating.
  db.recordConnected({ node, now: now + 2 });
  const afterStable = db.recordFailure(
    { node },
    { now: now + 2 + stableTime + 1, stableTime }
  );
  assert.equal(afterStable.count, 1, "stable host starts over");

  // A host that connects and drops straight away keeps escalating.
  db.recordConnected({ node, now: now + 1000 });
  const flapping = db.recordFailure(
    { node },
    { now: now + 1100, stableTime }
  );
  assert.equal(flapping.count, 2, "flapping host keeps escalating");
  db.close();
}

async function testPingTimeoutDefersToNodeOwner() {
  // Managed by a master: report the failure and stand down.
  await withTempDir("bsv-spv-ping-managed-", async (dir) => {
    const spv: any = new Spv({
      ticker: "BSV",
      node: "10.0.0.9:8333",
      dataDir: dir,
      autoReconnect: false,
    });
    let unresponsive = 0;
    let connects = 0;
    spv.on("node_unresponsive", () => unresponsive++);
    spv.connect = async () => {
      connects++;
    };
    spv.peer = { disconnect() {}, connected: true };

    spv.onNodeUnresponsive();

    assert.equal(unresponsive, 1, "failure is reported to the owner");
    assert.equal(spv.peer, undefined, "peer is torn down");
    assert.equal(connects, 0, "does not dial the same host again");
    assert.equal(spv.reconnectTimeout, undefined, "no retry is scheduled");
    await spv.close();
  });

  // Standalone: retry after autoReconnectWait instead of immediately.
  await withTempDir("bsv-spv-ping-solo-", async (dir) => {
    const spv: any = new Spv({
      ticker: "BSV",
      node: "10.0.0.9:8333",
      dataDir: dir,
      autoReconnect: true,
      autoReconnectWait: 10,
    });
    let retries = 0;
    spv.connect = async () => {
      retries++;
    };
    spv.peer = { disconnect() {}, connected: true };

    spv.onNodeUnresponsive();
    assert.equal(retries, 0, "waits instead of reconnecting immediately");

    await new Promise((resolve) => setTimeout(resolve, 80));
    assert.equal(retries, 1, "retries once the wait elapses");
    await spv.close();
  });
}

async function testMasterDoesNotRehandFailedHost() {
  await withTempDir("bsv-spv-rehand-", async (dir) => {
    const db = new DbNodes({ nodesDir: dir, readOnly: false });
    const node = "127.0.0.1:8333";
    const master = makeNodeMaster(db, [node]);

    const before = master.getNextNode("block");
    assert.deepEqual(
      { node: before.node, waitMs: before.waitMs },
      { node, waitMs: 0 },
      "fresh host is dialled immediately"
    );

    // This is the regression: the host just failed, so the very next call must
    // not hand it straight back with no wait.
    db.recordFailure({ node }, { stableTime: 60000 });
    const after = master.getNextNode("block");
    assert.equal(after.node, node, "only known host is still chosen");
    assert.ok(after.waitMs > 0, `expected a cooldown, got ${after.waitMs}`);
    assert.ok(after.waitMs <= 10000, "cooldown matches the base delay");
    assert.deepEqual(master.getNodes(), [], "cooling host is skipped");

    await db.close();
  });
}

// A peer store of 836k entries (BTC) overflowed the stack on queue refill when
// the refill used push(...nodes). Guard the large-set path and the dequeue order.
async function testGetNextNodeHandlesLargeNodeSets() {
  await withTempDir("bsv-spv-largenodes-", async (dir) => {
    const db = new DbNodes({ nodesDir: dir, readOnly: false });
    const master = makeNodeMaster(db, ["127.0.0.1:8333"]);
    const big = Array.from(
      { length: 200000 },
      (_, i) => `10.${(i >> 16) & 255}.${(i >> 8) & 255}.${i & 255}:8333`
    );
    master.getNodes = () => big;

    const first = master.getNextNode("block");
    assert.equal(
      first.node,
      big[0],
      "dequeues in the same order the previous shift() produced"
    );
    assert.equal(
      master.queue_block_nodes.length,
      big.length - 1,
      "whole node set is queued without overflowing"
    );

    const second = master.getNextNode("block");
    assert.equal(second.node, big[1], "second dequeue continues the sequence");

    await db.close();
  });
}

async function testMasterPrefersHealthyHostDuringCooldown() {
  await withTempDir("bsv-spv-prefer-", async (dir) => {
    const db = new DbNodes({ nodesDir: dir, readOnly: false });
    const failing = "10.0.0.1:8333";
    const healthy = "10.0.0.2:8333";
    const master = makeNodeMaster(db, [failing, healthy]);

    db.recordFailure({ node: failing }, { stableTime: 60000 });

    assert.deepEqual(
      master.getNodes().sort(),
      [healthy],
      "only the healthy host is eligible"
    );

    const next = master.getNextNode("block");
    assert.equal(next.node, healthy, "healthy host wins");
    assert.equal(next.waitMs, 0, "no wait when a host is eligible");

    await db.close();
  });
}

function makeMasterHarness() {
  const master: any = Object.create(Master.prototype);
  master.workers = {};
  master.block_nodes = new Set<string>();
  master.mempool_nodes = new Set<string>();
  master.forkedTypes = [] as string[];
  master.forkWorker = (type: string) => {
    master.forkedTypes.push(type);
  };
  return master;
}

function testWorkerExitRestartsActiveWorkers() {
  const master = makeMasterHarness();
  const worker: any = new EventEmitter();
  worker.id = 1;
  worker.spvType = "block";
  worker.spvNode = "node-a";
  worker.spvKey = "blocks-node-a";
  worker.exitedAfterDisconnect = false;
  master.workers[worker.spvKey] = worker;
  master.block_nodes.add(worker.spvNode);

  const originalError = console.error;
  console.error = () => {};
  try {
    master.onWorkerExit(worker, 1, null);
  } finally {
    console.error = originalError;
  }

  assert.equal(master.workers[worker.spvKey], undefined);
  assert.equal(master.block_nodes.has("node-a"), false);
  assert.deepEqual(master.forkedTypes, ["block"]);
}

function testWorkerExitDoesNotRestartIntentionalDisconnects() {
  const master = makeMasterHarness();
  const worker: any = new EventEmitter();
  worker.id = 2;
  worker.spvType = "mempool";
  worker.spvNode = "node-b";
  worker.spvKey = "mempool-node-b";
  worker.exitedAfterDisconnect = true;
  master.workers[worker.spvKey] = worker;
  master.mempool_nodes.add(worker.spvNode);

  const originalError = console.error;
  console.error = () => {};
  try {
    master.onWorkerExit(worker, null, "SIGTERM");
  } finally {
    console.error = originalError;
  }

  assert.equal(master.workers[worker.spvKey], undefined);
  assert.equal(master.mempool_nodes.has("node-b"), false);
  assert.deepEqual(master.forkedTypes, []);
}

function testMasterSocketFanout() {
  const master: any = makeMasterHarness();
  const listenerMessages: string[] = [];
  const mempoolMessages: string[] = [];
  const listenerSocket = { write: (data: string) => listenerMessages.push(data) };
  const mempoolSocket = { write: (data: string) => mempoolMessages.push(data) };

  master.sockets = { listener: listenerSocket };
  master.mempool_sockets = { mempool: mempoolSocket };

  master.onMessage("block-message");
  master.onMempoolTxMessage("mempool-message");

  assert.deepEqual(listenerMessages, ["block-message"]);
  assert.deepEqual(mempoolMessages, ["mempool-message"]);
}

async function testMasterCloseRequestsWorkerShutdown() {
  const master: any = Object.create(Master.prototype);
  const worker: any = new EventEmitter();
  const sentMessages: string[] = [];
  let workerKilled = false;
  let workerDead = false;
  let socketEnded = false;
  let nodesClosed = false;

  worker.id = 3;
  worker.isDead = () => workerDead;
  worker.send = (message: string) => {
    sentMessages.push(message);
    setImmediate(() => {
      workerDead = true;
      worker.emit("exit");
    });
  };
  worker.kill = () => {
    workerKilled = true;
  };

  master.workers = { worker };
  master.sockets = { listener: { end: () => (socketEnded = true) } };
  master.mempool_sockets = {};
  master.db_nodes = { close: async () => (nodesClosed = true) };
  master.block_nodes = new Set<string>();
  master.mempool_nodes = new Set<string>();

  await master.close();

  assert.equal(master.shuttingDown, true);
  assert.equal(socketEnded, true);
  assert.equal(nodesClosed, true);
  assert.equal(workerKilled, false);
  assert.deepEqual(
    sentMessages.map((message) => JSON.parse(message).command),
    ["shutdown"]
  );
}

function request({
  port,
  path,
}: {
  port: number;
  path: string;
}): Promise<{ status: number; headers: Http.IncomingHttpHeaders; body: Buffer }> {
  return new Promise((resolve, reject) => {
    const req = Http.request(
      { host: "127.0.0.1", port, path, method: "GET" },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () =>
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body: Buffer.concat(chunks),
          })
        );
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function listenOnRandomPort(server: Server) {
  server.listen({ port: 0, host: "127.0.0.1", SHOW_LOGS: false });
  await new Promise<void>((resolve) => server.server.once("listening", resolve));
  const address = server.server.address();
  assert.equal(typeof address, "object");
  assert.notEqual(address, null);
  return (address as AddressInfo).port;
}

async function testServerTxEndpointValidationAndSources() {
  await withTempDir("bsv-spv-server-", async (dir) => {
    const tx = genesisTx();
    const txid = tx.getTxid();
    const blockHash = "11".repeat(32);
    const setupBlocks = new DbBlocks({
      blocksDir: path.join(dir, "BSV", "blocks"),
      readOnly: false,
    });
    await setupBlocks.close();
    const setupHeaders = new DbHeaders({
      headersDir: path.join(dir, "BSV", "headers"),
      headers: new Headers(),
      readOnly: false,
    });
    await setupHeaders.close();
    const server = new Server({
      name: "regression-server",
      ticker: "BSV",
      dataDir: dir,
      disableInterval: true,
      mempool: false,
    });
    (server as any).db_mempool = {
      getTx: async () => ({
        tx,
        size: tx.length,
        time: 123,
      }),
      close: async () => {},
    };
    (server as any).db_blocks = {
      getTx: async () => ({ tx }),
      close: async () => {},
    };
    (server as any).headers = {
      getHash: () => blockHash,
      getHeight: () => 10,
      getTip: () => ({ height: 10, hash: blockHash }),
    };
    (server as any).db_headers = {
      getHeader: () => ({ time: 456 }),
      close: async () => {},
    };

    const port = await listenOnRandomPort(server);

    const invalid = await request({ port, path: "/txid/not-a-txid" });
    assert.equal(invalid.status, 404);
    assert.equal(invalid.body.toString(), "Invalid txid");

    const mempool = await request({ port, path: `/txid/${txid}` });
    assert.equal(mempool.status, 200);
    assert.equal(mempool.headers["x-ticker"], "BSV");
    assert.equal(mempool.headers["x-mempool-time"], "123");
    assert.equal(mempool.body.toString("hex"), tx.toBuffer().toString("hex"));

    const block = await request({
      port,
      path: `/txid/${txid}?block=${blockHash}&pos=1&len=${tx.length}`,
    });
    assert.equal(block.status, 200);
    assert.equal(block.headers["x-block-hash"], blockHash);
    assert.equal(block.headers["x-block-height"], "10");
    assert.equal(block.headers["x-block-time"], "456");
    assert.equal(block.body.toString("hex"), tx.toBuffer().toString("hex"));

    const badLen = await request({
      port,
      path: `/txid/${txid}?block=${blockHash}&pos=1&len=0`,
    });
    assert.equal(badLen.status, 404);

    await server.close();
  });
}

async function testMempoolDiscardsLegacyRocksdbFiles() {
  await withTempDir("bsv-spv-mempool-legacy-", async (dir) => {
    const legacy = [
      "CURRENT",
      "MANIFEST-000004",
      "OPTIONS-000007",
      "000003.log",
      "000005.sst",
      "LOCK",
      "IDENTITY",
    ];
    for (const name of legacy) fs.writeFileSync(path.join(dir, name), "junk");
    const unrelated = path.join(dir, "keep-me.txt");
    fs.writeFileSync(unrelated, "keep");

    const db = new DbMempool({ mempoolDir: dir });

    for (const name of legacy)
      assert.equal(
        fs.existsSync(path.join(dir, name)),
        false,
        `${name} should be discarded`
      );
    assert.equal(fs.existsSync(unrelated), true, "unrelated files preserved");
    assert.equal(
      fs.existsSync(path.join(dir, "data.mdb")),
      true,
      "LMDB store initialised"
    );
    await db.close();
  });
}

function testMempoolDoesNotLoadRocksdb() {
  const loaded = Object.keys(require.cache).filter((key) =>
    key.includes(`${path.sep}rocksdb${path.sep}`)
  );
  assert.deepEqual(loaded, [], `rocksdb must not be loaded: ${loaded}`);
}

async function main() {
  testMempoolDoesNotLoadRocksdb();
  await testMempoolPruneKeepsFreshTxs();
  await testMempoolDiscardsLegacyRocksdbFiles();
  await testMempoolCloseFlushesPendingBatchAndClearsIntervals();
  await testDelBlockClearsStaleSavedMarker();
  await testBlacklistUsesRollingExpiry();
  testBackoffDelayEscalatesAndCaps();
  await testNodeFailureBackoffPersistsAndExpires();
  testAttemptKeyIncludesPort();
  testStableConnectionResetsFailureStreak();
  await testPingTimeoutDefersToNodeOwner();
  await testMasterDoesNotRehandFailedHost();
  await testGetNextNodeHandlesLargeNodeSets();
  await testMasterPrefersHealthyHostDuringCooldown();
  testWorkerExitRestartsActiveWorkers();
  testWorkerExitDoesNotRestartIntentionalDisconnects();
  testMasterSocketFanout();
  await testMasterCloseRequestsWorkerShutdown();
  await testServerTxEndpointValidationAndSources();
  console.log("regression tests passed");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
