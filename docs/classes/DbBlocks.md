[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / DbBlocks

# Class: DbBlocks

Defined in: [src/db\_blocks.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L6)

## Constructors

### Constructor

> **new DbBlocks**(`__namedParameters`): `DbBlocks`

Defined in: [src/db\_blocks.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L14)

#### Parameters

##### \_\_namedParameters

###### blocksDir

`string`

###### readOnly?

`boolean` = `true`

#### Returns

`DbBlocks`

## Properties

### blocksDir

> **blocksDir**: `string`

Defined in: [src/db\_blocks.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L7)

***

### dbi\_blocks

> **dbi\_blocks**: `Database`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [src/db\_blocks.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L10)

***

### dbi\_root

> **dbi\_root**: `RootDatabase`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [src/db\_blocks.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L11)

***

### dbPath

> **dbPath**: `string`

Defined in: [src/db\_blocks.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L12)

***

### writeDir?

> `optional` **writeDir?**: `string`

Defined in: [src/db\_blocks.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L8)

***

### writeStream?

> `optional` **writeStream?**: `WriteStream`

Defined in: [src/db\_blocks.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L9)

## Methods

### blockExists()

> **blockExists**(`hash`): `boolean`

Defined in: [src/db\_blocks.ts:250](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L250)

#### Parameters

##### hash

`string`

#### Returns

`boolean`

***

### blockFileExists()

> **blockFileExists**(`hash`): `Promise`\<`boolean`\>

Defined in: [src/db\_blocks.ts:254](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L254)

#### Parameters

##### hash

`string`

#### Returns

`Promise`\<`boolean`\>

***

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/db\_blocks.ts:58](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L58)

#### Returns

`Promise`\<`void`\>

***

### delBlock()

> **delBlock**(`hash`): `Promise`\<`void`\>

Defined in: [src/db\_blocks.ts:231](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L231)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<`void`\>

***

### fileExists()

> **fileExists**(`dir`): `Promise`\<`boolean`\>

Defined in: [src/db\_blocks.ts:98](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L98)

#### Parameters

##### dir

`string`

#### Returns

`Promise`\<`boolean`\>

***

### getBlocks()

> **getBlocks**(): `Promise`\<`string`[]\>

Defined in: [src/db\_blocks.ts:75](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L75)

#### Returns

`Promise`\<`string`[]\>

***

### getBlocksSync()

> **getBlocksSync**(): `string`[]

Defined in: [src/db\_blocks.ts:80](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L80)

#### Returns

`string`[]

***

### getSavedBlocks()

> **getSavedBlocks**(): `string`[]

Defined in: [src/db\_blocks.ts:67](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L67)

#### Returns

`string`[]

***

### getSavedBlocksSync()

> **getSavedBlocksSync**(): `Set`\<`string`\>

Defined in: [src/db\_blocks.ts:85](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L85)

#### Returns

`Set`\<`string`\>

***

### getTx()

> **getTx**(`__namedParameters`): `Promise`\<\{ `buffer`: `Buffer`\<`ArrayBuffer`\>; `bytesRead`: `number`; `tx`: `Transaction` \| `undefined`; \}\>

Defined in: [src/db\_blocks.ts:259](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L259)

#### Parameters

##### \_\_namedParameters

###### block

`string` \| `Buffer`\<`ArrayBufferLike`\>

###### len

`number` = `1000000`

###### pos

`number`

###### txid?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<\{ `buffer`: `Buffer`\<`ArrayBuffer`\>; `bytesRead`: `number`; `tx`: `Transaction` \| `undefined`; \}\>

***

### markBlockSaved()

> **markBlockSaved**(`hash`): `Promise`\<`boolean`\> \| `undefined`

Defined in: [src/db\_blocks.ts:107](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L107)

#### Parameters

##### hash

`string`

#### Returns

`Promise`\<`boolean`\> \| `undefined`

***

### streamBlock()

> **streamBlock**(`__namedParameters`, `callback`): `Promise`\<`boolean`\>

Defined in: [src/db\_blocks.ts:169](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L169)

#### Parameters

##### \_\_namedParameters

###### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

###### height

`number`

###### highWaterMark?

`number` = `...`

##### callback

(`params`) => `any`

#### Returns

`Promise`\<`boolean`\>

***

### syncDb()

> **syncDb**(): `Promise`\<`void`\>

Defined in: [src/db\_blocks.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L40)

#### Returns

`Promise`\<`void`\>

***

### writeBlockChunk()

> **writeBlockChunk**(`__namedParameters`): `Promise`\<`unknown`\>

Defined in: [src/db\_blocks.ts:113](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_blocks.ts#L113)

#### Parameters

##### \_\_namedParameters

###### blockHash

`Buffer`

###### chunk

`Buffer`

###### finished

`boolean`

###### started

`boolean`

#### Returns

`Promise`\<`unknown`\>
