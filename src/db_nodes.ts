import * as bsv from "bsv-minimal";
import lmdb from "node-lmdb";
import fs from "fs";

export default class DbNodes {
  blacklistTime: number;
  env: any;
  dbi_seen: lmdb.Dbi;
  dbi_connected: lmdb.Dbi;
  dbi_blacklisted: lmdb.Dbi;

  constructor({
    nodesDir,
    blacklistTime = (+new Date() - 1000 * 60 * 60 * 24) / 1000, // 24 hour blacklist
  }: {
    nodesDir: string;
    blacklistTime?: number;
  }) {
    if (!nodesDir) throw Error(`Missing nodesDir`);
    fs.mkdirSync(nodesDir, { recursive: true });
    this.blacklistTime = blacklistTime;

    this.env = new lmdb.Env();
    this.env.open({
      path: nodesDir,
      mapSize: 1 * 1024 * 1024 * 1024, // 1GB node info max
      maxDbs: 5,
    });
    this.dbi_seen = this.env.openDbi({
      name: "peers_seen",
      create: true,
      keyIsString: true,
    });
    this.dbi_connected = this.env.openDbi({
      name: "peers_connected",
      create: true,
      keyIsString: true,
    });
    this.dbi_blacklisted = this.env.openDbi({
      name: "peers_blacklisted",
      create: true,
      keyIsString: true,
    });
  }

  close() {
    try {
      this.dbi_seen.close();
    } catch (err) {}
    try {
      this.dbi_connected.close();
    } catch (err) {}
    try {
      this.dbi_blacklisted.close();
    } catch (err) {}
    try {
      this.env.close();
    } catch (err) {}
  }

  saveSeenNodes(addrArray: any[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const nodes: string[] = [];
      if (addrArray.length === 0) return resolve(nodes);
      const operations: any = [];
      const bw = new bsv.utils.BufferWriter();
      const date = Math.round(+new Date() / 1000);
      bw.writeUInt32LE(date);
      const time = bw.toBuffer();
      const nodeArray = addrArray
        .filter(({ ipv4, port }) => ipv4 && port < 20000)
        .map(({ ipv4, port }) => `${ipv4}:${port}`);
      nodeArray.map((node) => {
        operations.push([this.dbi_seen, node, time, null]);
      });
      this.env.batchWrite(
        operations,
        { keyIsString: true },
        (err: any, results: number[]) => {
          if (err) return reject(err);
          nodeArray.map((node, i) => results[i] === 0 && nodes.push(node));
          resolve(nodes);
        }
      );
    });
  }

  connected(node: string) {
    const txn = this.env.beginTxn({ readOnly: false });
    let num = txn.getNumber(this.dbi_connected, node);
    num = num > 0 ? num + 1 : 1;
    txn.putNumber(this.dbi_connected, node, num);
    txn.commit();
  }

  blacklist(node: string) {
    const txn = this.env.beginTxn({ readOnly: false });
    const date = Math.round(+new Date() / 1000);
    txn.putNumber(this.dbi_blacklisted, node, date);
    txn.commit();
  }

  isBlacklisted(node: string) {
    const txn = this.env.beginTxn({ readOnly: false });
    const date = txn.getNumber(this.dbi_blacklisted, node);
    let blacklisted = false;
    if (date) {
      if (date > this.blacklistTime) {
        blacklisted = true;
      } else {
        txn.del(this.dbi_blacklisted, node, { keyIsString: true });
      }
    }
    txn.commit();
    return blacklisted;
  }

  async getBlacklistedNodes() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor: lmdb.Cursor<string> = new lmdb.Cursor(
      txn,
      this.dbi_blacklisted,
      {
        keyIsString: true,
      }
    );
    const nodes = [];
    const expired: any[] = [];
    for (
      let node = cursor.goToFirst();
      node !== null;
      node = cursor.goToNext()
    ) {
      const date = cursor.getCurrentNumber();
      if (date) {
        if (date > this.blacklistTime) {
          nodes.push(node);
        } else {
          expired.push(this.dbi_blacklisted, node);
        }
      }
    }
    cursor.close();
    txn.commit();
    if (expired.length > 0) {
      await new Promise((resolve, reject) => {
        this.env.batchWrite(
          expired,
          { keyIsString: true },
          (err: any, results: number[]) => {
            if (err) return reject(err);
            resolve(results);
          }
        );
      });
    }
    return nodes;
  }

  getConnectedNodes() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor = new lmdb.Cursor(txn, this.dbi_connected, {
      keyIsString: true,
    });
    const nodes: string[] = [];
    for (
      let node = cursor.goToFirst();
      node !== null;
      node = cursor.goToNext()
    ) {
      nodes.push(node);
    }
    cursor.close();
    txn.commit();
    return nodes;
  }

  getSeenNodes() {
    const txn = this.env.beginTxn({ readOnly: true });
    const cursor: lmdb.Cursor<string> = new lmdb.Cursor(txn, this.dbi_seen, {
      keyIsString: true,
    });
    const nodes = [];
    for (
      let node = cursor.goToFirst();
      node !== null;
      node = cursor.goToNext()
    ) {
      nodes.push(node);
    }
    cursor.close();
    txn.commit();
    return nodes;
  }
}
