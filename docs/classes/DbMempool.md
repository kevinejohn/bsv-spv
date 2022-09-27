[bsv-spv](../README.md) / DbMempool

# Class: DbMempool

## Table of contents

### Constructors

- [constructor](DbMempool.md#constructor)

### Properties

- [dbi\_tx\_times](DbMempool.md#dbi_tx_times)
- [dbi\_txs](DbMempool.md#dbi_txs)
- [env](DbMempool.md#env)
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

#### Defined in

[src/db_mempool.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L11)

## Properties

### dbi\_tx\_times

• **dbi\_tx\_times**: `Dbi`

#### Defined in

[src/db_mempool.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L9)

___

### dbi\_txs

• **dbi\_txs**: `Dbi`

#### Defined in

[src/db_mempool.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L8)

___

### env

• **env**: `any`

#### Defined in

[src/db_mempool.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L7)

___

### pruneAfter

• **pruneAfter**: `number`

#### Defined in

[src/db_mempool.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L6)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_mempool.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L40)

___

### delTxs

▸ **delTxs**(`txidArr`): `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txidArr` | `Buffer`[] |

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/db_mempool.ts:108](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L108)

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

[src/db_mempool.ts:171](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L171)

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

[src/db_mempool.ts:129](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L129)

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

[src/db_mempool.ts:178](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L178)

___

### pruneTxs

▸ **pruneTxs**(`olderThan?`): `Buffer`[] \| `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `olderThan?` | `number` |

#### Returns

`Buffer`[] \| `Promise`<`Buffer`[]\>

#### Defined in

[src/db_mempool.ts:232](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L232)

___

### saveTimes

▸ **saveTimes**(`txidArr`): `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txidArr` | `Buffer`[] |

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/db_mempool.ts:84](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L84)

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

[src/db_mempool.ts:52](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L52)
