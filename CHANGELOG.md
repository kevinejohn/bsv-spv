# Changelog

## 4.1.1

### Fixed

- `Master#getNextNode` no longer overflows the stack when refilling its node queue. 4.1.0 replaced a plain array assignment with `queue.push(...nodes)`, which passes every node as a separate argument and throws `RangeError: Maximum call stack size exceeded` once a peer store exceeds roughly 125k entries. Any long-running instance accumulates seen peers without bound, so this aborted startup for stores of that size — a BTC instance with 836k seen peers crashed on every launch. The queue is now filled with a loop.
- `getNextNode` dequeues with `pop()` against a reverse-ordered push instead of `shift()`, which is O(n) on an array of this size. The dequeue order is unchanged.

## 4.1.0

### Added

- Per-host connection backoff. `Master` records every failed connection attempt in a new `peers_attempts` LMDB store and will not hand that host out again until `nodeBackoffBase * 2^(failures - 1)` has elapsed, capped at `nodeBackoffMax`. Defaults are 10 seconds and 10 minutes. Holding a connection for `nodeStableTime` (default 1 minute) resets the host's failure streak, so a peer that finally drops after hours is retried promptly while a flapping one escalates.
- `DbNodes` gains `recordFailure`, `recordConnected`, `resetAttempts`, `getAttempt` and `getBackoffRemaining`, and exports a pure `backoffDelay(count, base, max)` helper. `NodeAttempt` and `backoffDelay` are exported from the package root.
- `Spv` emits `node_unresponsive` when a peer stops answering pings, so callers can distinguish a silent peer from a dropped socket.
- Regression coverage for the backoff: escalation and cap, persistence across a reopen, the stable-versus-flapping reset, and the master refusing to re-hand a host it just failed.

### Changed

- `MasterOptions` adds `nodeBackoffBase`, `nodeBackoffMax` and `nodeStableTime`.
- `Master#getNextNode` now returns `{ node, waitMs }` instead of a bare node string. `waitMs` is only non-zero when every known host is still cooling down, in which case the shortest outstanding cooldown wins.
- Workers no longer reconnect on their own. `Master` passes `autoReconnect: false` and owns node selection, so a failed host cannot be retried behind its back before the cooldown expires.

### Fixed

- `Master` no longer reconnects to a host that just failed. Previously a failing seed node was handed straight back to the worker with no delay: `getNodes()` passed seed nodes through unfiltered, and `getNextNode()` fell back to a random seed once its queue drained. Against a closed port this produced roughly 29,000 reconnect attempts to one IP in 15 seconds; it is now one attempt per cooldown.
- `ClusterWorker` sent `send_new_node` on every `could_not_connect` without any throttle, bypassing the `disconnects >= 3` gate entirely. Requests are now de-duplicated per attempt and carry the host that failed, so the master can apply the correct cooldown.
- `Spv` reconnected to the same host immediately after three missed pings, resetting `peer.disconnects` first so the failure never counted. It now emits `node_unresponsive`, tears the peer down and stands down: under a `Master` the cooldown decides what happens next, and a standalone instance retries after `autoReconnectWait` instead of dialling straight away.

## 4.0.0

### Breaking

- `DbMempool` no longer exposes the LevelUP `db` handle. It is replaced by `dbi_root` (the LMDB root database) and `dbi_txs` (the `txs` sub-database). The public methods — `saveTx`, `getTx`, `getTxids`, `delTxs`, `pruneTxs` and `close` — are unchanged. Code that reached into `db` must move to the LMDB handles.
- Importing the package no longer installs `source-map-support` as a side effect. Source maps now use Node's built-in support, which requires Node 20 or newer — already required by `engines`.

### Changed

- `DbMempool` now uses the bundled LMDB backend instead of RocksDB, matching `DbBlocks`, `DbHeaders`, `DbListener` and `DbNodes`. This drops `rocksdb`, `@types/rocksdb`, `levelup` and `@types/levelup` from the dependency tree, so installing `bsv-spv` no longer compiles RocksDB from source on platforms without a prebuilt binary.
- On first open, `DbMempool` discards leftover RocksDB files from an existing mempool directory. The mempool is a cache, so no data migration is required.

### Added

- Regression coverage for the mempool backend swap: legacy RocksDB directory cleanup, preservation of unrelated files, and a guard asserting `rocksdb` is never loaded.

### Security

- Updated `express` to `^5.3.0`, clearing a critical `proxy-addr` IP-spoofing advisory, a high-severity `body-parser` denial of service, and a `qs` denial of service. These are runtime dependencies and were reachable through the tx server.
- Pinned `brace-expansion` to `^5.0.13` through `overrides`, clearing seven denial-of-service advisories reachable via the docs toolchain.
- Updated `lmdb` to `^3.5.10`, `typedoc` to `^0.28.20`, `typedoc-plugin-markdown` to `^4.14.1`, and `@types/node` to `^25.9.9`.

### Removed

- Dropped `source-map-support`, which pulled in `source-map` and `buffer-from` as well. Node has supported source maps natively since v16.6, and the package requires Node 20 or newer, so `src/index.ts` now calls `process.setSourceMapsEnabled(true)`. Stack traces are unchanged: a thrown error still resolves to `src/db_mempool.ts:44:28` rather than the compiled `lib/` path.

### Known issues

- `minimatch@10.2.6`, pulled in by `typedoc`, remains flagged for a moderate denial of service. It is only fixed in `minimatch@11`, which removed the `matchOne` API that `typedoc@0.28.20` still calls — forcing it breaks `npm run docs`. Development-only, blocked on an upstream typedoc release.
- TypeScript 7 compiles this project, but `ts-node@10` cannot run it (`ts.sys` is absent from the native compiler). Adopting TypeScript 7 requires replacing `ts-node` with `tsx` across the test scripts.

## 3.0.0

This release contains bug fixes, dependency upgrades, stronger test coverage, and runtime cleanup changes. Because it raises the minimum Node.js version, removes XEC support, updates several major dependencies, and changes header-network validation behavior, publish this as a major release unless consumers have already opted into these changes.

### Fixed

- Fixed a mempool pruning bug where `DbMempool.getTxids({ olderThan })` returned every transaction instead of only stale entries, causing `pruneTxs()` to delete fresh mempool transactions.
- Fixed stale block metadata handling. `DbBlocks.delBlock()` now removes the LMDB saved marker even when the `.bin` block file is already missing, allowing missing blocks to be redownloaded.
- Fixed peer blacklist expiry. `DbNodes` now stores blacklist duration and computes the cutoff at lookup time, so peers age out without restarting the daemon.
- Fixed master process behavior when a worker exits. The master now unregisters failed workers, clears active node tracking, and restarts unexpected block or mempool worker exits instead of shutting down the whole process.
- Fixed the broken listener test script path. `test-lister` now points at `tests/listener.ts`, and `test-listener` is also available as the correctly named alias.
- Fixed stale test examples that referenced old `BlockStream.transactions` and removed `DbMempool.getTxs()` APIs.

### Changed

- Updated runtime dependencies:
  - `bsv-headers` to `^3.0.5`
  - `bsv-minimal` to `^3.0.1`
  - `bsv-p2p` to `^3.0.2`
  - `express` to `^5.2.1`
  - `lmdb` to `^3.5.4`
  - `cors` to `^2.8.6`
- Updated development dependencies, including TypeScript `^6.0.3`, TypeDoc `^0.28.19`, TypeDoc Markdown plugin `^4.11.0`, and current `@types/*` packages.
- Changed TypeScript configuration to use `module` and `moduleResolution` `Node16`.
- Raised the minimum Node.js version to `>=20`.
- `bsv-headers` is now initialized with `network: ticker`, so header validation follows the selected supported chain.
- Supported tickers are now explicit: `BTC`, `BCH`, and `BSV`.
- Removed XEC support from public documentation and runtime validation. Passing `ticker: "XEC"` now fails fast with a clear unsupported ticker error.
- Added public cleanup methods:
  - `Spv.close()`
  - `Master.close()`
  - `Listener.close()`
  - `Server.close()`
- On `SIGINT` or `SIGTERM`, the master now requests worker shutdown, closes listener sockets, stops worker restarts, and closes LMDB handles. Workers also handle shutdown signals and master shutdown messages.
- Remote Bitcoin peers are disconnected by closing the TCP socket. There is no standard Bitcoin P2P “goodbye” message to send before disconnecting.

### Added

- Added a bounded regression test suite at `tests/regression.ts`.
- Added safe `npm test` flow:
  - build source
  - type-check tests
  - run bounded regression tests
- Added GitHub Actions CI that runs install, tests, production audit, and TypeDoc generation.
- Added live/manual test scripts:
  - `test-live`
  - `test-listener`
  - `test-server`
- Added chain-specific live cluster test files for BTC, BCH, and BSV.
- Added docs for exported `DbListenerBlockOptions`, `SpvEvents`, and `SupportedTicker`.

### Tests

- Added regression coverage for:
  - mempool pruning preserving fresh transactions
  - mempool close flushing pending batch writes and clearing intervals
  - stale block marker cleanup when the block file is already missing
  - blacklist expiry using a rolling cutoff
  - worker exit restart behavior
  - master socket fan-out for block and mempool messages
  - master close requesting worker shutdown and closing resources
  - `/txid/:txid` server validation, mempool responses, and block responses
- `npm test`, `npm audit`, TypeDoc generation, and `git diff --check` were run successfully during this update.
- Live cluster smoke tests were run successfully for BTC, BCH, and BSV using `tests/cluster_btc.ts`, `tests/cluster_bch.ts`, and `tests/cluster_bsv.ts`.
- A previous BSV smoke run surfaced a `bsv-headers` stack overflow during long header sync; `bsv-headers` has since been updated through `3.0.5`, and the per-chain live smoke tests passed after that update.

### Migration Notes

- Back up existing data directories before running this release in production.
- LMDB compatibility was smoke-tested by creating an environment with `lmdb@2.8.5`, reading and writing it with `lmdb@3.5.4`, and reopening it with `lmdb@2.8.5`. That test passed. Still, test this release against a copy of your real `dataDir` before deploying.
- Existing LMDB files created by ordinary `lmdb@2.8.5` usage are expected to be readable and writable by `lmdb@3.5.4`. Very old LMDB data-format-v1 builds may need separate compatibility testing.
- If you previously used `ticker: "XEC"`, migrate away from this package version or add custom chain support before upgrading.
- Express was upgraded to version 5. If you subclass or directly interact with `Server.app`, review Express 5 behavior changes.
- Because `bsv-headers` now receives `network: ticker`, chain-specific header validation is stricter than before.

### Release Checklist

- Confirm the intended live cluster test layout is committed.
- Per-chain live smoke tests for `BTC`, `BCH`, and `BSV` have passed.
- Run:

```sh
npm ci
npm test
npm audit --omit=dev
npm run docs
npm pack --dry-run
```

- Review the package contents from `npm pack --dry-run` and confirm no generated data directories are included.
