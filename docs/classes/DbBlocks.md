[bsv-spv](../README.md) / DbBlocks

# Class: DbBlocks

## Table of contents

### Constructors

- [constructor](DbBlocks.md#constructor)

### Properties

- [blocksDir](DbBlocks.md#blocksdir)
- [writeDir](DbBlocks.md#writedir)
- [writeStream](DbBlocks.md#writestream)

### Methods

- [blockExists](DbBlocks.md#blockexists)
- [delBlock](DbBlocks.md#delblock)
- [getBlocks](DbBlocks.md#getblocks)
- [getSavedBlocks](DbBlocks.md#getsavedblocks)
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

#### Defined in

[src/db_blocks.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L10)

## Properties

### blocksDir

• **blocksDir**: `string`

#### Defined in

[src/db_blocks.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L6)

___

### writeDir

• `Optional` **writeDir**: `string`

#### Defined in

[src/db_blocks.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L7)

___

### writeStream

• `Optional` **writeStream**: `WriteStream`

#### Defined in

[src/db_blocks.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L8)

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

[src/db_blocks.ts:133](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L133)

___

### delBlock

▸ **delBlock**(`hash`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` \| `Buffer` |

#### Returns

`void`

#### Defined in

[src/db_blocks.ts:122](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L122)

___

### getBlocks

▸ **getBlocks**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L16)

___

### getSavedBlocks

▸ **getSavedBlocks**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:21](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L21)

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

[src/db_blocks.ts:138](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L138)

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

[src/db_blocks.ts:87](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L87)

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

[src/db_blocks.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L34)
