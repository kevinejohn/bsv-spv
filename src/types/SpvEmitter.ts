import { Header, Transaction } from "bsv-minimal";
import TypedEventEmitter from "./TypedEventEmitter";
import { PeerEmitter } from "bsv-p2p/lib/types/PeerEmitter";
import Peer from "bsv-p2p";
import { VersionOptions } from "bsv-p2p/lib/messages/version";

export type SpvEvents = {
  headers_saved: (data: { hashes: Buffer[] }) => void;
  block_reorg: (data: { hash: string; height: number }) => void;
  headers_new: (data: { headers: Header[] }) => void;
  disconnected: (data: {
    node: string;
    ticker: string;
    disconnects: number;
  }) => void;
  peer_error: (data: {
    ticker: string;
    node: string;
    port: number;
    error: Error;
    magic: Buffer;
    extmsg: boolean;
    buffer: Buffer;
  }) => void;
  connected: (data: { ticker: string; port: number; node: string }) => void;
  version_invalid: (data: {
    error: string;
    user_agent?: string;
    expected_user_agent?: string;
    version: VersionOptions;
    node: string;
  }) => void;
  version: (data: { version: VersionOptions; node: string }) => void;
  block_seen: (data: { hashes: Buffer[] }) => void;
  block_chunk: (data: {
    header: Header;
    chunk: Buffer;
    blockHash: Buffer;
    finished?: boolean;
    started?: boolean;
    size: number;
    height?: number;
    txCount: number;
    startDate: number;
  }) => void;
  block_saved: (data: {
    height?: number;
    hash: string;
    size: number;
    startDate: number;
    txCount: number;
  }) => void;
  block_already_saved: (data: {
    height?: number;
    hash: string;
    size: number;
    startDate: number;
    txCount: number;
  }) => void;
  pruned_block: (data: { height: number; hash: string }) => void;
  block_txs: (data: {
    header: Header;
    started?: boolean;
    finished?: boolean;
    size?: number;
    height?: number;
    transactions: [number, Transaction, number, number][];
    startDate?: number;
    txCount?: number;
  }) => void;
  mempool_tx: (data: { transaction: Transaction }) => void;
  mempool_txs_seen: (data: { txids: Buffer[] }) => void;
  could_not_connect: (data: { ticker: string; node: string }) => void;
  block_downloading: (data: { hash: string; height: number }) => void;
  block_pruned: (data: { height?: number; hash: string }) => void;
};

export type SpvEmitter = TypedEventEmitter<SpvEvents>;
