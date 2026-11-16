[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / DbMempool

# Class: DbMempool

Defined in: [src/db\_mempool.ts:26](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L26)

## Constructors

### Constructor

> **new DbMempool**(`__namedParameters`): `DbMempool`

Defined in: [src/db\_mempool.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L35)

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

Defined in: [src/db\_mempool.ts:30](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L30)

#### key

> **key**: `Buffer`

#### type

> **type**: `"put"`

#### value

> **value**: `Buffer`

***

### dbi\_root

> **dbi\_root**: `RootDatabase`

Defined in: [src/db\_mempool.ts:27](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L27)

***

### dbi\_txs

> **dbi\_txs**: `Database`\<`Buffer`\<`ArrayBufferLike`\>, `Buffer`\<`ArrayBufferLike`\>\>

Defined in: [src/db\_mempool.ts:28](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L28)

***

### intervalBatch?

> `optional` **intervalBatch?**: `Timeout`

Defined in: [src/db\_mempool.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L31)

***

### intervalPrune?

> `optional` **intervalPrune?**: `Timeout`

Defined in: [src/db\_mempool.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L32)

***

### pruneAfter

> **pruneAfter**: `number`

Defined in: [src/db\_mempool.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L33)

***

### txs

> **txs**: `object`

Defined in: [src/db\_mempool.ts:29](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L29)

#### Index Signature

\[`key`: `string`\]: `Buffer`\<`ArrayBufferLike`\>

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/db\_mempool.ts:66](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L66)

#### Returns

`Promise`\<`void`\>

***

### delTxs()

> **delTxs**(`txids`): `Promise`\<`void`\>

Defined in: [src/db\_mempool.ts:112](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L112)

#### Parameters

##### txids

`Buffer`\<`ArrayBufferLike`\>[]

#### Returns

`Promise`\<`void`\>

***

### getTx()

> **getTx**(`txid`): `Promise`\<\{ `size`: `number`; `time`: `number`; `tx`: `Transaction`; \}\>

Defined in: [src/db\_mempool.ts:150](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L150)

#### Parameters

##### txid

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<\{ `size`: `number`; `time`: `number`; `tx`: `Transaction`; \}\>

***

### getTxids()

> **getTxids**(`__namedParameters`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

Defined in: [src/db\_mempool.ts:119](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L119)

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

Defined in: [src/db\_mempool.ts:169](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L169)

#### Parameters

##### olderThan?

`number`

#### Returns

`Promise`\<`void`\>

***

### saveTx()

> **saveTx**(`tx`): `void`

Defined in: [src/db\_mempool.ts:85](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L85)

#### Parameters

##### tx

`Transaction`

#### Returns

`void`

***

### saveTxs()

> **saveTxs**(): `Promise`\<`void`\>

Defined in: [src/db\_mempool.ts:102](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L102)

#### Returns

`Promise`\<`void`\>
