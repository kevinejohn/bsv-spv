import * as lmdb from "lmdb";
import fs from "fs";

export default class DbNodes {
  blacklistTime: number;
  env: any;
  dbi_root: lmdb.RootDatabase;
  dbi_seen: lmdb.Database<number>;
  dbi_connected: lmdb.Database<number>;
  dbi_blacklisted: lmdb.Database<number>;
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
      await this.dbi_root.close();
    } catch (err) {}
  }

  saveSeenNodes(addrArray: any[]): string[] {
    const nodes: string[] = [];
    const time = +new Date();
    const nodeArray = addrArray
      .filter(({ ipv4, port }) => ipv4 && port < 20000)
      .map(({ ipv4, port }) => `${ipv4}:${port}`);
    for (const node of nodeArray) {
      if (!this.dbi_seen.get(node)) {
        this.dbi_seen.put(node, time);
        nodes.push(node);
      }
    }
    return nodes;
  }

  connected(node: string) {
    let count = this.dbi_connected.get(node) || 0;
    this.dbi_connected.put(node, count + 1);
  }

  blacklist(node: string) {
    const date = Math.round(+new Date() / 1000);
    this.dbi_blacklisted.put(node, date);
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
