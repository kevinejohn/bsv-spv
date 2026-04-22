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
import DbNodes from "../src/db_nodes";
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

function putLevel(db: DbMempool["db"], key: Buffer, value: Buffer) {
  return new Promise<void>((resolve, reject) => {
    db.put(key, value, (err: Error | null | undefined) => {
      if (err) reject(err);
      else resolve();
    });
  });
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

    await putLevel(
      db.db,
      oldKey,
      mempoolValue(now - 10_000, Buffer.from([1]))
    );
    await putLevel(db.db, freshKey, mempoolValue(now, Buffer.from([2])));

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

async function main() {
  await testMempoolPruneKeepsFreshTxs();
  await testMempoolCloseFlushesPendingBatchAndClearsIntervals();
  await testDelBlockClearsStaleSavedMarker();
  await testBlacklistUsesRollingExpiry();
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
