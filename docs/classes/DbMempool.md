[bsv-spv](../README.md) / DbMempool

# Class: DbMempool

## Table of contents

### Constructors

- [constructor](DbMempool.md#constructor)

### Properties

- [dbi\_root](DbMempool.md#dbi_root)
- [dbi\_tx\_times](DbMempool.md#dbi_tx_times)
- [dbi\_txs](DbMempool.md#dbi_txs)
- [mempoolDir](DbMempool.md#mempooldir)
- [pruneAfter](DbMempool.md#pruneafter)

### Methods

- [close](DbMempool.md#close)
- [delTxs](DbMempool.md#deltxs)
- [getTx](DbMempool.md#gettx)
- [getTxids](DbMempool.md#gettxids)
- [getTxs](DbMempool.md#gettxs)
- [pruneTxs](DbMempool.md#prunetxs)
- [saveTimes](DbMempool.md#savetimes)
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

[src/db_mempool.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L12)

## Properties

### dbi\_root

• **dbi\_root**: `RootDatabase`<`any`, `Key`\>

#### Defined in

[src/db_mempool.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L7)

___

### dbi\_tx\_times

• **dbi\_tx\_times**: `Database`<`Buffer`, `Key`\>

#### Defined in

[src/db_mempool.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L9)

___

### dbi\_txs

• **dbi\_txs**: `Database`<`Buffer`, `Key`\>

#### Defined in

[src/db_mempool.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L8)

___

### mempoolDir

• **mempoolDir**: `string`

#### Defined in

[src/db_mempool.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L10)

___

### pruneAfter

• **pruneAfter**: `number`

#### Defined in

[src/db_mempool.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L6)

## Methods

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_mempool.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L39)

___

### delTxs

▸ **delTxs**(`txidArr`): `Buffer`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `txidArr` | `Buffer`[] |

#### Returns

`Buffer`[]

#### Defined in

[src/db_mempool.ts:87](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L87)

___

### getTx

▸ **getTx**(`txid`, `getTime?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `txid` | `string` | `undefined` |
| `getTime` | `boolean` | `true` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `time` | ``null`` \| `number` |
| `tx` | `default` |

#### Defined in

[src/db_mempool.ts:122](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L122)

___

### getTxids

▸ **getTxids**(`__namedParameters`): `Buffer`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.newerThan?` | `number` |
| `__namedParameters.olderThan?` | `number` |

#### Returns

`Buffer`[]

#### Defined in

[src/db_mempool.ts:95](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L95)

___

### getTxs

▸ **getTxs**(`txids?`, `getTime?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `txids?` | `Buffer`[] \| `string`[] | `undefined` |
| `getTime` | `boolean` | `false` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `times` | (``null`` \| `number`)[] |
| `txs` | `default`[] |

#### Defined in

[src/db_mempool.ts:129](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L129)

___

### pruneTxs

▸ **pruneTxs**(`olderThan?`): `Buffer`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `olderThan?` | `number` |

#### Returns

`Buffer`[]

#### Defined in

[src/db_mempool.ts:170](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L170)

___

### saveTimes

▸ **saveTimes**(`txidArr`): `Buffer`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `txidArr` | `Buffer`[] |

#### Returns

`Buffer`[]

#### Defined in

[src/db_mempool.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L72)

___

### saveTxs

▸ **saveTxs**(`txsArray`): `Promise`<{ `size`: `number` ; `txids`: `Buffer`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txsArray` | `default`[] |

#### Returns

`Promise`<{ `size`: `number` ; `txids`: `Buffer`[]  }\>

#### Defined in

[src/db_mempool.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L51)
