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

  constructor({
    nodesDir,
    blacklistTime = (+new Date() - 1000 * 60 * 60 * 24) / 1000, // 24 hour blacklist
    readOnly = true,
  }: {
    nodesDir: string;
    blacklistTime?: number;
    readOnly?: boolean;
  }) {
    if (!nodesDir) throw Error(`Missing nodesDir`);
    fs.mkdirSync(nodesDir, { recursive: true });
    this.nodesDir = nodesDir;
    this.blacklistTime = blacklistTime;

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

  saveSeenNodes(addrs: NetAddress[]) {
    let count = 0;
    for (const addr of addrs) {
      const key = `${addr.ipv4}:${addr.port}`;
      if (!this.dbi_seen.get(key) && addr.ipv4 && addr.port < 20000) {
        this.dbi_seen.putSync(key, addr);
        count++;
      }
    }
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

  connected(node: string) {
    let count = this.dbi_connected.get(node) || 0;
    this.dbi_connected.put(node, count + 1);
  }

  hasConnected(node: string): boolean {
    const data = this.dbi_connected.get(node);
    return !!data;
  }

  blacklist(node: string) {
    if (!this.isBlacklisted(node)) {
      const date = Math.round(+new Date() / 1000);
      this.dbi_blacklisted.put(node, date);
    }
  }

  isBlacklisted(node: string): boolean {
    const date = this.dbi_blacklisted.get(node);
    return typeof date === "number" && date > this.blacklistTime;
  }

  getBlacklistedNodes() {
    const nodes = [];
    for (const { key: node, value: date } of this.dbi_blacklisted.getRange()) {
      if (typeof node !== "string" || typeof date !== "number") continue;
      if (date > this.blacklistTime) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  getConnectedNodes() {
    const nodes: string[] = [];
    for (const node of this.dbi_connected.getKeys()) {
      if (typeof node !== "string") continue;
      nodes.push(node);
    }
    return nodes;
  }

  getSeenNodes() {
    const nodes: string[] = [];
    for (const node of this.dbi_seen.getKeys()) {
      if (typeof node !== "string") continue;
      nodes.push(node);
    }
    return nodes;
  }
}
