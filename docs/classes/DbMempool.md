[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / DbMempool

# Class: DbMempool

Defined in: [src/db\_mempool.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L6)

## Constructors

### Constructor

> **new DbMempool**(`__namedParameters`): `DbMempool`

Defined in: [src/db\_mempool.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L14)

#### Parameters

##### \_\_namedParameters

###### mempoolDir

`string`

###### pruneAfter?

`number` = `...`

###### readOnly?

`boolean` = `false`

#### Returns

`DbMempool`

## Properties

### batch

> **batch**: `object`[]

Defined in: [src/db\_mempool.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L9)

#### key

> **key**: `Buffer`

#### type

> **type**: `"put"`

#### value

> **value**: `Buffer`

***

### db

> **db**: `LevelUp`

Defined in: [src/db\_mempool.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L7)

***

### intervalBatch?

> `optional` **intervalBatch?**: `Timeout`

Defined in: [src/db\_mempool.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L10)

***

### intervalPrune?

> `optional` **intervalPrune?**: `Timeout`

Defined in: [src/db\_mempool.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L11)

***

### pruneAfter

> **pruneAfter**: `number`

Defined in: [src/db\_mempool.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L12)

***

### txs

> **txs**: `object`

Defined in: [src/db\_mempool.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L8)

#### Index Signature

\[`key`: `string`\]: `Buffer`\<`ArrayBufferLike`\>

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/db\_mempool.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L31)

#### Returns

`Promise`\<`void`\>

***

### delTxs()

> **delTxs**(`txids`): `Promise`\<`unknown`\>

Defined in: [src/db\_mempool.ts:75](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L75)

#### Parameters

##### txids

`Buffer`\<`ArrayBufferLike`\>[]

#### Returns

`Promise`\<`unknown`\>

***

### getTx()

> **getTx**(`txid`): `Promise`\<\{ `size`: `number`; `time`: `number`; `tx`: `Transaction`; \}\>

Defined in: [src/db\_mempool.ts:121](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L121)

#### Parameters

##### txid

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<\{ `size`: `number`; `time`: `number`; `tx`: `Transaction`; \}\>

***

### getTxids()

> **getTxids**(`__namedParameters`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

Defined in: [src/db\_mempool.ts:87](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L87)

#### Parameters

##### \_\_namedParameters

###### newerThan?

`number`

###### olderThan?

`number`

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

***

### pruneTxs()

> **pruneTxs**(`olderThan?`): `Promise`\<`void`\>

Defined in: [src/db\_mempool.ts:140](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L140)

#### Parameters

##### olderThan?

`number`

#### Returns

`Promise`\<`void`\>

***

### saveTx()

> **saveTx**(`tx`): `void`

Defined in: [src/db\_mempool.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L45)

#### Parameters

##### tx

`Transaction`

#### Returns

`void`

***

### saveTxs()

> **saveTxs**(): `Promise`\<`unknown`\>

Defined in: [src/db\_mempool.ts:62](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L62)

#### Returns

`Promise`\<`unknown`\>
