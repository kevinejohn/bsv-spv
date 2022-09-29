[bsv-spv](../README.md) / DbPlugin

# Class: DbPlugin

## Table of contents

### Constructors

- [constructor](DbPlugin.md#constructor)

### Properties

- [dbIsOpen](DbPlugin.md#dbisopen)
- [dbi\_blocks](DbPlugin.md#dbi_blocks)
- [dbi\_heights](DbPlugin.md#dbi_heights)
- [env](DbPlugin.md#env)
- [pluginDir](DbPlugin.md#plugindir)
- [processedBlocks](DbPlugin.md#processedblocks)
- [readOnly](DbPlugin.md#readonly)

### Methods

- [batchBlocksProcessed](DbPlugin.md#batchblocksprocessed)
- [blocksProcessed](DbPlugin.md#blocksprocessed)
- [close](DbPlugin.md#close)
- [delBlocks](DbPlugin.md#delblocks)
- [getBlockHash](DbPlugin.md#getblockhash)
- [getBlockInfo](DbPlugin.md#getblockinfo)
- [getHash](DbPlugin.md#gethash)
- [isProcessed](DbPlugin.md#isprocessed)
- [loadBlocks](DbPlugin.md#loadblocks)
- [markBlockProcessed](DbPlugin.md#markblockprocessed)
- [open](DbPlugin.md#open)

## Constructors

### constructor

• **new DbPlugin**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.pluginDir` | `string` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_plugin.ts:24](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L24)

## Properties

### dbIsOpen

• **dbIsOpen**: `boolean`

#### Defined in

[src/db_plugin.ts:20](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L20)

___

### dbi\_blocks

• **dbi\_blocks**: `Dbi`

#### Defined in

[src/db_plugin.ts:18](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L18)

___

### dbi\_heights

• **dbi\_heights**: `Dbi`

#### Defined in

[src/db_plugin.ts:19](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L19)

___

### env

• **env**: `any`

#### Defined in

[src/db_plugin.ts:17](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L17)

___

### pluginDir

• **pluginDir**: `string`

#### Defined in

[src/db_plugin.ts:21](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L21)

___

### processedBlocks

• **processedBlocks**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/db_plugin.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L16)

___

### readOnly

• **readOnly**: `boolean`

#### Defined in

[src/db_plugin.ts:22](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L22)

## Methods

### batchBlocksProcessed

▸ **batchBlocksProcessed**(`array`): `Promise`<``null``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `PluginOptions`[] |

#### Returns

`Promise`<``null``\>

#### Defined in

[src/db_plugin.ts:116](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L116)

___

### blocksProcessed

▸ **blocksProcessed**(): `number`

#### Returns

`number`

#### Defined in

[src/db_plugin.ts:168](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L168)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_plugin.ts:78](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L78)

___

### delBlocks

▸ **delBlocks**(`from`, `to`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

#### Returns

`void`

#### Defined in

[src/db_plugin.ts:201](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L201)

___

### getBlockHash

▸ **getBlockHash**(`height`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`any`

#### Defined in

[src/db_plugin.ts:188](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L188)

___

### getBlockInfo

▸ **getBlockInfo**(`blockHash`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHash` | `string` \| `Buffer` |

#### Returns

`any`

#### Defined in

[src/db_plugin.ts:175](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L175)

___

### getHash

▸ **getHash**(`height`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`string`

#### Defined in

[src/db_plugin.ts:171](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L171)

___

### isProcessed

▸ **isProcessed**(`height`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`boolean`

#### Defined in

[src/db_plugin.ts:165](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L165)

___

### loadBlocks

▸ **loadBlocks**(): `void`

#### Returns

`void`

#### Defined in

[src/db_plugin.ts:148](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L148)

___

### markBlockProcessed

▸ **markBlockProcessed**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `PluginOptions` |

#### Returns

`void`

#### Defined in

[src/db_plugin.ts:92](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L92)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[src/db_plugin.ts:57](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L57)
