import * as lmdb from "lmdb";
import fs from "fs";
import { NetAddress } from "bsv-p2p/lib/messages/address";

export default class DbNodes {
  blacklistTime: number;
  env: any;
  dbi_root: lmdb.RootDatabase;
  dbi_meta: lmdb.Database<any, string>;
  dbi_seen: lmdb.Database<any, string>;
  dbi_connected: lmdb.Database<number, string>;
  dbi_blacklisted: lmdb.Database<number, string>;
  nodesDir: string;
  enableIpv6: boolean;

  constructor({
    nodesDir,
    blacklistTime = (+new Date() - 1000 * 60 * 60 * 24) / 1000, // 24 hour blacklist
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
    return typeof date === "number" && date > this.blacklistTime;
  }

  getBlacklistedNodes() {
    const nodes = [];
    for (const { key: url, value: date } of this.dbi_blacklisted.getRange()) {
      if (typeof url !== "string" || typeof date !== "number") continue;
      if (date > this.blacklistTime) {
        if (this.enableIpv6 || url.split(":").length === 2) nodes.push(url);
      }
    }
    return nodes;
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
