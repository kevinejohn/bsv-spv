[bsv-spv](../README.md) / DbListener

# Class: DbListener

## Table of contents

### Constructors

- [constructor](DbListener.md#constructor)

### Properties

- [dbi\_blocks](DbListener.md#dbi_blocks)
- [dbi\_heights](DbListener.md#dbi_heights)
- [dbi\_root](DbListener.md#dbi_root)
- [listenerDir](DbListener.md#listenerdir)

### Methods

- [batchBlocksProcessed](DbListener.md#batchblocksprocessed)
- [blocksProcessed](DbListener.md#blocksprocessed)
- [close](DbListener.md#close)
- [delBlocks](DbListener.md#delblocks)
- [getBlockHash](DbListener.md#getblockhash)
- [getBlockInfo](DbListener.md#getblockinfo)
- [getHash](DbListener.md#gethash)
- [isProcessed](DbListener.md#isprocessed)
- [markBlockProcessed](DbListener.md#markblockprocessed)

## Constructors

### constructor

• **new DbListener**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.listenerDir` | `string` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_listener.ts:20](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L20)

## Properties

### dbi\_blocks

• **dbi\_blocks**: `Database`<`Buffer`, `Key`\>

#### Defined in

[src/db_listener.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L16)

___

### dbi\_heights

• **dbi\_heights**: `Database`<`Buffer`, `Key`\>

#### Defined in

[src/db_listener.ts:17](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L17)

___

### dbi\_root

• **dbi\_root**: `RootDatabase`<`any`, `Key`\>

#### Defined in

[src/db_listener.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L15)

___

### listenerDir

• **listenerDir**: `string`

#### Defined in

[src/db_listener.ts:18](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L18)

## Methods

### batchBlocksProcessed

▸ **batchBlocksProcessed**(`array`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `ListenerOptions`[] |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/db_listener.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L72)

___

### blocksProcessed

▸ **blocksProcessed**(): `number`

#### Returns

`number`

#### Defined in

[src/db_listener.ts:90](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L90)

___

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_listener.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L42)

___

### delBlocks

▸ **delBlocks**(`from`, `to`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/db_listener.ts:112](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L112)

___

### getBlockHash

▸ **getBlockHash**(`height`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`string`

#### Defined in

[src/db_listener.ts:106](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L106)

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

[src/db_listener.ts:99](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L99)

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

[src/db_listener.ts:93](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L93)

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

[src/db_listener.ts:87](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L87)

___

### markBlockProcessed

▸ **markBlockProcessed**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `ListenerOptions` |

#### Returns

`void`

#### Defined in

[src/db_listener.ts:54](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L54)
