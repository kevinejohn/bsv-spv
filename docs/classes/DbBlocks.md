[bsv-spv](../README.md) / DbBlocks

# Class: DbBlocks

## Table of contents

### Constructors

- [constructor](DbBlocks.md#constructor)

### Properties

- [blocksDir](DbBlocks.md#blocksdir)
- [dbi\_blocks](DbBlocks.md#dbi_blocks)
- [env](DbBlocks.md#env)
- [writeDir](DbBlocks.md#writedir)
- [writeStream](DbBlocks.md#writestream)

### Methods

- [blockExists](DbBlocks.md#blockexists)
- [blockExistsSync](DbBlocks.md#blockexistssync)
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

[src/db_blocks.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L13)

## Properties

### blocksDir

• **blocksDir**: `string`

#### Defined in

[src/db_blocks.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L7)

___

### dbi\_blocks

• **dbi\_blocks**: `Dbi`

#### Defined in

[src/db_blocks.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L11)

___

### env

• **env**: `any`

#### Defined in

[src/db_blocks.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L10)

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

[src/db_blocks.ts:219](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L219)

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

[src/db_blocks.ts:226](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L226)

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

[src/db_blocks.ts:202](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L202)

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

[src/db_blocks.ts:96](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L96)

___

### getBlocks

▸ **getBlocks**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/db_blocks.ts:73](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L73)

___

### getBlocksSync

▸ **getBlocksSync**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:78](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L78)

___

### getSavedBlocks

▸ **getSavedBlocks**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:55](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L55)

___

### getSavedBlocksSync

▸ **getSavedBlocksSync**(): `Set`<`string`\>

#### Returns

`Set`<`string`\>

#### Defined in

[src/db_blocks.ts:83](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L83)

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

[src/db_blocks.ts:231](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L231)

___

### streamBlock

▸ **streamBlock**(`__namedParameters`, `callback`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.hash` | `string` \| `Buffer` |
| `__namedParameters.height` | `number` |
| `callback` | (`params`: `BlockStream`) => `void` \| `Promise`<`void`\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/db_blocks.ts:163](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L163)

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

[src/db_blocks.ts:105](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L105)
