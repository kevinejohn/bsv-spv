import * as lmdb from "lmdb";
import fs from "fs";
import { NetAddress } from "bsv-p2p/lib/messages/address";

/**
 * Consecutive failed connection attempts recorded against a single node.
 *
 * `count` drives the exponential backoff. `connectedAt` is the time of the
 * most recent *successful* connection and is used to decide whether a later
 * disconnect was a one-off (the host was healthy for a while) or a flap.
 */
export interface NodeAttempt {
  count: number;
  last: number;
  connectedAt?: number;
}

/**
 * Exponential backoff delay for the Nth consecutive failed attempt.
 *
 * count 1 -> base, count 2 -> 2 * base, count 3 -> 4 * base, capped at `max`.
 * `count <= 0` means the node has no recorded failures and may be tried now.
 */
export function backoffDelay(count: number, base: number, max: number) {
  if (!(count > 0)) return 0;
  if (!(base > 0)) return 0;
  const delay = base * Math.pow(2, count - 1);
  return Math.min(max > 0 ? max : delay, delay);
}

export default class DbNodes {
  blacklistTime: number;
  env: any;
  dbi_root: lmdb.RootDatabase;
  dbi_meta: lmdb.Database<any, string>;
  dbi_seen: lmdb.Database<any, string>;
  dbi_connected: lmdb.Database<number, string>;
  dbi_blacklisted: lmdb.Database<number, string>;
  dbi_attempts: lmdb.Database<NodeAttempt, string>;
  nodesDir: string;
  enableIpv6: boolean;

  constructor({
    nodesDir,
    blacklistTime = 1000 * 60 * 60 * 24, // 24 hour blacklist
    enableIpv6 = false,
    readOnly = true,
  }: {
    nodesDir: string;
    blacklistTime?: number;
    enableIpv6?: boolean;
    readOnly?: boolean;
  }) {
    if (!nodesDir) throw Error(`Missing nodesDir`);
    fs.mkdirSync(nodesDir, { recursive: true });
    this.nodesDir = nodesDir;
    this.blacklistTime = blacklistTime;
    this.enableIpv6 = enableIpv6;

    this.dbi_root = lmdb.open({
      path: nodesDir,
      readOnly,
    });
    this.dbi_meta = this.dbi_root.openDB({
      name: "meta",
    });
    this.dbi_seen = this.dbi_root.openDB({
      name: "peers_seen",
    });
    this.dbi_connected = this.dbi_root.openDB({
      name: "peers_connected",
    });
    this.dbi_blacklisted = this.dbi_root.openDB({
      name: "peers_blacklisted",
    });
    this.dbi_attempts = this.dbi_root.openDB({
      name: "peers_attempts",
    });
  }

  async close() {
    try {
      await this.dbi_seen.close();
    } catch (err) {}
    try {
      await this.dbi_connected.close();
    } catch (err) {}
    try {
      await this.dbi_blacklisted.close();
    } catch (err) {}
    try {
      await this.dbi_attempts.close();
    } catch (err) {}
    try {
      await this.dbi_meta.close();
    } catch (err) {}
    try {
      await this.dbi_root.close();
    } catch (err) {}
  }

  formatUrl({ node, port }: { node: string; port?: number }) {
    if (!port) {
      // assume port is already in node
      return node;
    } else if (node.split(":").length === 7) {
      // ipv6 address
      return `[${node}]:${port}`;
    } else {
      // ipv4 address
      return `${node}:${port}`;
    }
  }

  async saveSeenNodes(addrs: NetAddress[] | string[]) {
    let count = 0;
    for (const addr of addrs) {
      let url;
      if (typeof addr === "string") {
        url = addr;
      } else {
        const node = addr.ipv4 || addr.ipv6;
        if (node) url = this.formatUrl({ node, port: addr.port });
      }
      if (url) {
        if (!this.dbi_seen.get(url)) count++;
        this.dbi_seen.put(url, `${+new Date()}`);
      }
    }
    if (count) await this.dbi_seen.flushed;
    return count;
  }

  markSavedSeen() {
    this.dbi_meta.put("saved_seen", { date: +new Date() });
  }
  hasSavedSeen(secondsAgo = 60) {
    const result = this.dbi_meta.get("saved_seen");
    if (result) {
      const { date } = result;
      const compare = +new Date() - secondsAgo * 1000;
      if (date > compare) return true;
    }
    return false;
  }

  connected({ node, port }: { node: string; port?: number }) {
    const url = this.formatUrl({ node, port });
    let count = this.dbi_connected.get(url) || 0;
    this.dbi_connected.put(url, count + 1);
  }

  hasConnected({ node, port }: { node: string; port?: number }): boolean {
    const url = this.formatUrl({ node, port });
    const data = this.dbi_connected.get(url);
    return !!data;
  }

  getAttempt({
    node,
    port,
  }: {
    node: string;
    port?: number;
  }): NodeAttempt | undefined {
    const url = this.formatUrl({ node, port });
    const data = this.dbi_attempts.get(url);
    if (!data || typeof data !== "object") return undefined;
    return data as NodeAttempt;
  }

  /**
   * Record the outcome of a connection attempt that failed.
   *
   * Consecutive failures escalate the backoff. A host that had been connected
   * for at least `stableTime` is treated as a fresh, one-off failure instead of
   * a flapping host, so a long-lived peer that finally drops is retried soon.
   */
  recordFailure(
    { node, port }: { node: string; port?: number },
    { stableTime = 0, now = +new Date() }: { stableTime?: number; now?: number } = {}
  ): NodeAttempt {
    const url = this.formatUrl({ node, port });
    const prev = this.getAttempt({ node, port });
    const wasStable =
      !!prev &&
      typeof prev.connectedAt === "number" &&
      stableTime > 0 &&
      now - prev.connectedAt >= stableTime;
    const count = wasStable ? 1 : (prev && prev.count > 0 ? prev.count : 0) + 1;
    const attempt: NodeAttempt = { count, last: now };
    // Commit synchronously: the master reads this back immediately to decide
    // whether to hand the host out again, and LMDB batches writes by default.
    this.dbi_attempts.transactionSync(() => {
      this.dbi_attempts.put(url, attempt);
    });
    return attempt;
  }

  /** Record a successful connection. Does not clear the failure counter. */
  recordConnected({
    node,
    port,
    now = +new Date(),
  }: {
    node: string;
    port?: number;
    now?: number;
  }) {
    const url = this.formatUrl({ node, port });
    const prev = this.getAttempt({ node, port });
    if (!prev) return;
    this.dbi_attempts.transactionSync(() => {
      this.dbi_attempts.put(url, { ...prev, connectedAt: now });
    });
  }

  /** Forget a host's failure streak. */
  resetAttempts({ node, port }: { node: string; port?: number }) {
    const url = this.formatUrl({ node, port });
    this.dbi_attempts.transactionSync(() => {
      this.dbi_attempts.remove(url);
    });
  }

  /**
   * Milliseconds remaining before this node may be attempted again.
   * Returns 0 when the node has no failures or its cooldown has elapsed.
   */
  getBackoffRemaining(
    { node, port }: { node: string; port?: number },
    {
      base,
      max,
      now = +new Date(),
    }: { base: number; max: number; now?: number }
  ): number {
    const attempt = this.getAttempt({ node, port });
    if (!attempt || !(attempt.count > 0)) return 0;
    const delay = backoffDelay(attempt.count, base, max);
    const elapsed = now - attempt.last;
    return Math.max(0, delay - elapsed);
  }

  blacklist({ node, port }: { node: string; port?: number }) {
    if (!this.isBlacklisted({ node, port })) {
      const date = Math.round(+new Date() / 1000);
      const url = this.formatUrl({ node, port });
      this.dbi_blacklisted.put(url, date);
    }
  }

  isBlacklisted({ node, port }: { node: string; port?: number }): boolean {
    const url = this.formatUrl({ node, port });
    const date = this.dbi_blacklisted.get(url);
    return typeof date === "number" && date > this.getBlacklistCutoff();
  }

  getBlacklistedNodes() {
    const nodes = [];
    const blacklistCutoff = this.getBlacklistCutoff();
    for (const { key: url, value: date } of this.dbi_blacklisted.getRange()) {
      if (typeof url !== "string" || typeof date !== "number") continue;
      if (date > blacklistCutoff) {
        if (this.enableIpv6 || url.split(":").length === 2) nodes.push(url);
      }
    }
    return nodes;
  }

  getBlacklistCutoff() {
    return Math.round((+new Date() - this.blacklistTime) / 1000);
  }

  getConnectedNodes() {
    const nodes: string[] = [];
    for (const url of this.dbi_connected.getKeys()) {
      if (typeof url !== "string") continue;
      if (this.enableIpv6 || url.split(":").length === 2) nodes.push(url);
    }
    return nodes;
  }

  getSeenNodes() {
    const nodes: string[] = [];
    for (const url of this.dbi_seen.getKeys()) {
      if (typeof url !== "string") continue;
      if (this.enableIpv6 || url.split(":").length === 2) nodes.push(url);
    }
    return nodes;
  }
}
