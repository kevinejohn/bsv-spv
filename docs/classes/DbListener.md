[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / DbListener

# Class: DbListener

Defined in: [src/db\_listener.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L14)

## Constructors

### Constructor

> **new DbListener**(`__namedParameters`): `DbListener`

Defined in: [src/db\_listener.ts:20](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L20)

#### Parameters

##### \_\_namedParameters

###### listenerDir

`string`

###### readOnly?

`boolean` = `false`

#### Returns

`DbListener`

## Properties

### dbi\_blocks

> **dbi\_blocks**: `Database`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [src/db\_listener.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L16)

***

### dbi\_heights

> **dbi\_heights**: `Database`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [src/db\_listener.ts:17](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L17)

***

### dbi\_root

> **dbi\_root**: `RootDatabase`

Defined in: [src/db\_listener.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L15)

***

### listenerDir

> **listenerDir**: `string`

Defined in: [src/db\_listener.ts:18](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L18)

## Methods

### batchBlocksProcessed()

> **batchBlocksProcessed**(`array`): `Promise`\<`boolean`\>

Defined in: [src/db\_listener.ts:81](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L81)

#### Parameters

##### array

[`DbListenerBlockOptions`](../interfaces/DbListenerBlockOptions.md)[]

#### Returns

`Promise`\<`boolean`\>

***

### blocksProcessed()

> **blocksProcessed**(): `number`

Defined in: [src/db\_listener.ts:99](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L99)

#### Returns

`number`

***

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/db\_listener.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L44)

#### Returns

`Promise`\<`void`\>

***

### delBlocks()

> **delBlocks**(`from`, `to`): `Promise`\<`boolean`\>

Defined in: [src/db\_listener.ts:121](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L121)

#### Parameters

##### from

`number`

##### to

`number`

#### Returns

`Promise`\<`boolean`\>

***

### getBlockHash()

> **getBlockHash**(`height`): `string`

Defined in: [src/db\_listener.ts:115](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L115)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getBlockInfo()

> **getBlockInfo**(`blockHash`): `any`

Defined in: [src/db\_listener.ts:108](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L108)

#### Parameters

##### blockHash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`any`

***

### getHash()

> **getHash**(`height`): `string`

Defined in: [src/db\_listener.ts:102](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L102)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getSize()

> **getSize**(): `void`

Defined in: [src/db\_listener.ts:128](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L128)

#### Returns

`void`

***

### isProcessed()

> **isProcessed**(`height`): `boolean`

Defined in: [src/db\_listener.ts:96](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L96)

#### Parameters

##### height

`number`

#### Returns

`boolean`

***

### markBlockProcessed()

> **markBlockProcessed**(`__namedParameters`): `Promise`\<\[`boolean`, `boolean`\]\>

Defined in: [src/db\_listener.ts:56](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_listener.ts#L56)

#### Parameters

##### \_\_namedParameters

[`DbListenerBlockOptions`](../interfaces/DbListenerBlockOptions.md)

#### Returns

`Promise`\<\[`boolean`, `boolean`\]\>
