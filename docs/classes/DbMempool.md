[bsv-spv](../README.md) / DbMempool

# Class: DbMempool

## Table of contents

### Constructors

- [constructor](DbMempool.md#constructor)

### Properties

- [dbIsOpen](DbMempool.md#dbisopen)
- [dbi\_tx\_times](DbMempool.md#dbi_tx_times)
- [dbi\_txs](DbMempool.md#dbi_txs)
- [env](DbMempool.md#env)
- [mempoolDir](DbMempool.md#mempooldir)
- [pruneAfter](DbMempool.md#pruneafter)
- [readOnly](DbMempool.md#readonly)

### Methods

- [close](DbMempool.md#close)
- [delTxs](DbMempool.md#deltxs)
- [getTx](DbMempool.md#gettx)
- [getTxids](DbMempool.md#gettxids)
- [getTxs](DbMempool.md#gettxs)
- [open](DbMempool.md#open)
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

[src/db_mempool.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L14)

## Properties

### dbIsOpen

• **dbIsOpen**: `boolean`

#### Defined in

[src/db_mempool.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L12)

___

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

### mempoolDir

• **mempoolDir**: `string`

#### Defined in

[src/db_mempool.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L10)

___

### pruneAfter

• **pruneAfter**: `number`

#### Defined in

[src/db_mempool.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L6)

___

### readOnly

• **readOnly**: `boolean`

#### Defined in

[src/db_mempool.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L11)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_mempool.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L72)

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

[src/db_mempool.ts:152](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L152)

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

[src/db_mempool.ts:222](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L222)

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

[src/db_mempool.ts:178](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L178)

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

[src/db_mempool.ts:229](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L229)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[src/db_mempool.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L50)

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

[src/db_mempool.ts:285](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L285)

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

[src/db_mempool.ts:123](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L123)

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

[src/db_mempool.ts:86](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_mempool.ts#L86)
