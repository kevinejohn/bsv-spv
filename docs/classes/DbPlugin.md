[bsv-spv](../README.md) / DbPlugin

# Class: DbPlugin

## Table of contents

### Constructors

- [constructor](DbPlugin.md#constructor)

### Properties

- [dbi\_blocks](DbPlugin.md#dbi_blocks)
- [dbi\_heights](DbPlugin.md#dbi_heights)
- [env](DbPlugin.md#env)
- [processedBlocks](DbPlugin.md#processedblocks)

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

## Constructors

### constructor

• **new DbPlugin**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.pluginDir` | `string` |

#### Defined in

[src/db_plugin.ts:21](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L21)

## Properties

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

### processedBlocks

• **processedBlocks**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/db_plugin.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L16)

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

[src/db_plugin.ts:80](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L80)

___

### blocksProcessed

▸ **blocksProcessed**(): `number`

#### Returns

`number`

#### Defined in

[src/db_plugin.ts:131](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L131)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_plugin.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L44)

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

[src/db_plugin.ts:160](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L160)

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

[src/db_plugin.ts:149](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L149)

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

[src/db_plugin.ts:138](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L138)

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

[src/db_plugin.ts:134](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L134)

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

[src/db_plugin.ts:128](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L128)

___

### loadBlocks

▸ **loadBlocks**(): `void`

#### Returns

`void`

#### Defined in

[src/db_plugin.ts:113](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L113)

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

[src/db_plugin.ts:56](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_plugin.ts#L56)
