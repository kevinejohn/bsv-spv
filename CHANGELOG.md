# Changelog

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
