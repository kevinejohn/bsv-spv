[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / NodeAttempt

# Interface: NodeAttempt

Defined in: [src/db\_nodes.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L12)

Consecutive failed connection attempts recorded against a single node.

`count` drives the exponential backoff. `connectedAt` is the time of the
most recent *successful* connection and is used to decide whether a later
disconnect was a one-off (the host was healthy for a while) or a flap.

## Properties

### connectedAt?

> `optional` **connectedAt?**: `number`

Defined in: [src/db\_nodes.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L15)

***

### count

> **count**: `number`

Defined in: [src/db\_nodes.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L13)

***

### last

> **last**: `number`

Defined in: [src/db\_nodes.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L14)
