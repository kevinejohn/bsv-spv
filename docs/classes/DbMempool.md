[bsv-spv](../README.md) / DbMempool

# Class: DbMempool

## Table of contents

### Constructors

- [constructor](DbMempool.md#constructor)

### Properties

- [batch](DbMempool.md#batch)
- [db](DbMempool.md#db)
- [intervalBatch](DbMempool.md#intervalbatch)
- [intervalPrune](DbMempool.md#intervalprune)
- [pruneAfter](DbMempool.md#pruneafter)
- [txs](DbMempool.md#txs)

### Methods

- [close](DbMempool.md#close)
- [delTxs](DbMempool.md#deltxs)
- [getTx](DbMempool.md#gettx)
- [getTxids](DbMempool.md#gettxids)
- [pruneTxs](DbMempool.md#prunetxs)
- [saveTx](DbMempool.md#savetx)
- [saveTxs](DbMempool.md#savetxs)

## Constructors

### constructor

• **new DbMempool**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.mempoolDir` | `string` |
| `__namedParameters.pruneAfter?` | `number` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_mempool.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L15)

## Properties

### batch

• **batch**: `AbstractBatch`<`any`, `any`\>[]

#### Defined in

[src/db_mempool.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L10)

___

### db

• **db**: `LevelUp`<`AbstractLevelDOWN`<`any`, `any`\>, `AbstractIterator`<`any`, `any`\>\>

#### Defined in

[src/db_mempool.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L8)

___

### intervalBatch

• `Optional` **intervalBatch**: `Timer`

#### Defined in

[src/db_mempool.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L11)

___

### intervalPrune

• `Optional` **intervalPrune**: `Timer`

#### Defined in

[src/db_mempool.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L12)

___

### pruneAfter

• **pruneAfter**: `number`

#### Defined in

[src/db_mempool.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L13)

___

### txs

• **txs**: `Object`

#### Index signature

▪ [key: `string`]: `Buffer`

#### Defined in

[src/db_mempool.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L9)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_mempool.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L32)

___

### delTxs

▸ **delTxs**(`txids`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txids` | `Buffer`[] |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/db_mempool.ts:68](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L68)

___

### getTx

▸ **getTx**(`txid`): `Promise`<{ `size`: `number` ; `time`: `number` ; `tx`: `default`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txid` | `string` \| `Buffer` |

#### Returns

`Promise`<{ `size`: `number` ; `time`: `number` ; `tx`: `default`  }\>

#### Defined in

[src/db_mempool.ts:112](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L112)

___

### getTxids

▸ **getTxids**(`__namedParameters`): `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.newerThan?` | `number` |
| `__namedParameters.olderThan?` | `number` |

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/db_mempool.ts:80](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L80)

___

### pruneTxs

▸ **pruneTxs**(`olderThan?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `olderThan?` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_mempool.ts:131](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L131)

___

### saveTx

▸ **saveTx**(`tx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `default` |

#### Returns

`void`

#### Defined in

[src/db_mempool.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L38)

___

### saveTxs

▸ **saveTxs**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/db_mempool.ts:55](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L55)
