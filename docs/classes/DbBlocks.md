[bsv-spv](../README.md) / DbBlocks

# Class: DbBlocks

## Table of contents

### Constructors

- [constructor](DbBlocks.md#constructor)

### Properties

- [blocksDir](DbBlocks.md#blocksdir)
- [dbIsOpen](DbBlocks.md#dbisopen)
- [dbPath](DbBlocks.md#dbpath)
- [dbi\_blocks](DbBlocks.md#dbi_blocks)
- [env](DbBlocks.md#env)
- [readOnly](DbBlocks.md#readonly)
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
- [open](DbBlocks.md#open)
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

[src/db_blocks.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L16)

## Properties

### blocksDir

• **blocksDir**: `string`

#### Defined in

[src/db_blocks.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L7)

___

### dbIsOpen

• **dbIsOpen**: `boolean`

#### Defined in

[src/db_blocks.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L12)

___

### dbPath

• **dbPath**: `string`

#### Defined in

[src/db_blocks.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L13)

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

### readOnly

• **readOnly**: `boolean`

#### Defined in

[src/db_blocks.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L14)

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

[src/db_blocks.ts:256](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L256)

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

[src/db_blocks.ts:265](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L265)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_blocks.ts:79](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L79)

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

[src/db_blocks.ts:239](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L239)

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

[src/db_blocks.ts:133](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L133)

___

### getBlocks

▸ **getBlocks**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/db_blocks.ts:110](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L110)

___

### getBlocksSync

▸ **getBlocksSync**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:115](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L115)

___

### getSavedBlocks

▸ **getSavedBlocks**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_blocks.ts:90](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L90)

___

### getSavedBlocksSync

▸ **getSavedBlocksSync**(): `Set`<`string`\>

#### Returns

`Set`<`string`\>

#### Defined in

[src/db_blocks.ts:120](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L120)

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

[src/db_blocks.ts:270](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L270)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[src/db_blocks.ts:62](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L62)

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

[src/db_blocks.ts:200](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L200)

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

[src/db_blocks.ts:142](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L142)
