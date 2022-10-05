[bsv-spv](../README.md) / DbBlocks

# Class: DbBlocks

## Table of contents

### Constructors

- [constructor](DbBlocks.md#constructor)

### Properties

- [blocksDir](DbBlocks.md#blocksdir)
- [dbPath](DbBlocks.md#dbpath)
- [dbi\_blocks](DbBlocks.md#dbi_blocks)
- [dbi\_root](DbBlocks.md#dbi_root)
- [writeDir](DbBlocks.md#writedir)
- [writeStream](DbBlocks.md#writestream)

### Methods

- [blockExists](DbBlocks.md#blockexists)
- [blockExistsSync](DbBlocks.md#blockexistssync)
- [close](DbBlocks.md#close)
- [delBlock](DbBlocks.md#delblock)
- [fileExists](DbBlocks.md#fileexists)
- [getBlocks](DbBlocks.md#getblocks)
- [getBlocksSync](DbBlocks.md#getblockssync)
- [getSavedBlocks](DbBlocks.md#getsavedblocks)
- [getSavedBlocksSync](DbBlocks.md#getsavedblockssync)
- [getTx](DbBlocks.md#gettx)
- [streamBlock](DbBlocks.md#streamblock)
- [writeBlockChunk](DbBlocks.md#writeblockchunk)

## Constructors

### constructor

• **new DbBlocks**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.blocksDir` | `string` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_blocks.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L14)

## Properties

### blocksDir

• **blocksDir**: `string`

#### Defined in

[src/db_blocks.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L7)

___

### dbPath

• **dbPath**: `string`

#### Defined in

[src/db_blocks.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L12)

___

### dbi\_blocks

• **dbi\_blocks**: `Database`<`Buffer`, `Key`\>

#### Defined in

[src/db_blocks.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L10)

___

### dbi\_root

• **dbi\_root**: `RootDatabase`<`Buffer`, `Key`\>

#### Defined in

[src/db_blocks.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L11)

___

### writeDir

• `Optional` **writeDir**: `string`

#### Defined in

[src/db_blocks.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L8)

___

### writeStream

• `Optional` **writeStream**: `WriteStream`

#### Defined in

[src/db_blocks.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L9)

## Methods

### blockExists

▸ **blockExists**(`hash`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`boolean`

#### Defined in

[src/db_blocks.ts:206](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L206)

___

### blockExistsSync

▸ **blockExistsSync**(`hash`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |

#### Returns

`boolean`

#### Defined in

[src/db_blocks.ts:210](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L210)

___

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_blocks.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L45)

___

### delBlock

▸ **delBlock**(`hash`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` \| `Buffer` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_blocks.ts:193](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L193)

___

### fileExists

▸ **fileExists**(`dir`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/db_blocks.ts:85](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L85)

___

### getBlocks

▸ **getBlocks**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/db_blocks.ts:62](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L62)

___

### getBlocksSync

▸ **getBlocksSync**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:67](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L67)

___

### getSavedBlocks

▸ **getSavedBlocks**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:54](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L54)

___

### getSavedBlocksSync

▸ **getSavedBlocksSync**(): `Set`<`string`\>

#### Returns

`Set`<`string`\>

#### Defined in

[src/db_blocks.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L72)

___

### getTx

▸ **getTx**(`__namedParameters`): `Promise`<{ `buffer`: `Buffer` ; `bytesRead`: `number` ; `tx`: `undefined` \| `default`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.block` | `string` \| `Buffer` |
| `__namedParameters.len` | `number` |
| `__namedParameters.pos` | `number` |
| `__namedParameters.txid?` | `string` \| `Buffer` |

#### Returns

`Promise`<{ `buffer`: `Buffer` ; `bytesRead`: `number` ; `tx`: `undefined` \| `default`  }\>

#### Defined in

[src/db_blocks.ts:215](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L215)

___

### streamBlock

▸ **streamBlock**(`__namedParameters`, `callback`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.hash` | `string` \| `Buffer` |
| `__namedParameters.height` | `number` |
| `callback` | (`params`: `BlockStream`) => `void` \| `Promise`<`void`\> |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/db_blocks.ts:150](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L150)

___

### writeBlockChunk

▸ **writeBlockChunk**(`__namedParameters`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.blockHash` | `Buffer` |
| `__namedParameters.chunk` | `Buffer` |
| `__namedParameters.finished` | `boolean` |
| `__namedParameters.started` | `boolean` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/db_blocks.ts:94](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L94)
