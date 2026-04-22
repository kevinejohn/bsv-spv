[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / Listener

# Class: Listener

Defined in: [src/listener.ts:28](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L28)

## Extends

- `TypedEventEmitter`\<[`SpvEvents`](../type-aliases/SpvEvents.md), `this`\>

## Extended by

- [`Server`](Server.md)

## Constructors

### Constructor

> **new Listener**(`__namedParameters`): `Listener`

Defined in: [src/listener.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L50)

#### Parameters

##### \_\_namedParameters

[`ListenerOptions`](../interfaces/ListenerOptions.md)

#### Returns

`Listener`

#### Overrides

`(EventEmitter as new () => SpvEmitter).constructor`

## Properties

### blockHeight

> **blockHeight**: `number`

Defined in: [src/listener.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L31)

***

### client?

> `optional` **client?**: `Socket`

Defined in: [src/listener.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L44)

***

### closing

> **closing**: `boolean`

Defined in: [src/listener.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L48)

***

### db\_blocks

> **db\_blocks**: [`DbBlocks`](DbBlocks.md)

Defined in: [src/listener.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L38)

***

### db\_headers

> **db\_headers**: [`DbHeaders`](DbHeaders.md)

Defined in: [src/listener.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L39)

***

### db\_listener

> **db\_listener**: [`DbListener`](DbListener.md)

Defined in: [src/listener.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L40)

***

### disableInterval

> **disableInterval**: `boolean` \| `undefined`

Defined in: [src/listener.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L32)

***

### headers

> **headers**: `Headers`

Defined in: [src/listener.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L41)

***

### host

> **host**: `string`

Defined in: [src/listener.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L34)

***

### interval?

> `optional` **interval?**: `Timeout`

Defined in: [src/listener.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L43)

***

### mempool\_txs

> **mempool\_txs**: `boolean`

Defined in: [src/listener.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L36)

***

### multithread?

> `optional` **multithread?**: `object`

Defined in: [src/listener.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L33)

#### index

> **index**: `number`

#### threads

> **threads**: `number`

***

### name

> **name**: `string`

Defined in: [src/listener.ts:30](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L30)

***

### port

> **port**: `number`

Defined in: [src/listener.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L35)

***

### reconnectTime

> **reconnectTime**: `number`

Defined in: [src/listener.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L37)

***

### reconnectTimeout?

> `optional` **reconnectTimeout?**: `Timeout`

Defined in: [src/listener.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L42)

***

### syncingBlocks

> **syncingBlocks**: `boolean`

Defined in: [src/listener.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L47)

***

### ticker

> **ticker**: `ChainTicker`

Defined in: [src/listener.ts:29](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L29)

***

### txsSeen

> **txsSeen**: `number`

Defined in: [src/listener.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L45)

***

### txsSize

> **txsSize**: `number`

Defined in: [src/listener.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L46)

## Methods

### addListener()

> **addListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [src/types/TypedEventEmitter.ts:24](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L24)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### listener

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).addListener`

***

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/listener.ts:425](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L425)

#### Returns

`Promise`\<`void`\>

***

### connect()

> **connect**(`__namedParameters`): `void`

Defined in: [src/listener.ts:197](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L197)

#### Parameters

##### \_\_namedParameters

###### host?

`string` = `...`

###### mempool_txs?

`boolean` = `true`

###### port

`number` = `...`

#### Returns

`void`

***

### disconnect()

> **disconnect**(): `void`

Defined in: [src/listener.ts:126](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L126)

#### Returns

`void`

***

### emit()

> **emit**\<`E`\>(`event`, ...`args`): `boolean`

Defined in: [src/types/TypedEventEmitter.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L37)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### args

...`Parameters`\<[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]\>

#### Returns

`boolean`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).emit`

***

### eventNames()

> **eventNames**(): (`string` \| `symbol`)[]

Defined in: [src/types/TypedEventEmitter.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L42)

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

`(EventEmitter as new () => SpvEmitter).eventNames`

***

### getBlockInfo()

> **getBlockInfo**(`__namedParameters`): `any`

Defined in: [src/listener.ts:399](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L399)

#### Parameters

##### \_\_namedParameters

###### hash

`string`

###### height

`number`

#### Returns

`any`

***

### getMaxListeners()

> **getMaxListeners**(): `number`

Defined in: [src/types/TypedEventEmitter.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L47)

#### Returns

`number`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).getMaxListeners`

***

### listenerCount()

> **listenerCount**\<`E`\>(`event`): `number`

Defined in: [src/types/TypedEventEmitter.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L45)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

#### Returns

`number`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).listenerCount`

***

### listeners()

> **listeners**\<`E`\>(`event`): [`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\][]

Defined in: [src/types/TypedEventEmitter.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L44)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

#### Returns

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\][]

#### Inherited from

`(EventEmitter as new () => SpvEmitter).listeners`

***

### off()

> **off**\<`E`\>(`event`, `listener`): `this`

Defined in: [src/types/TypedEventEmitter.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L33)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### listener

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).off`

***

### on()

> **on**\<`E`\>(`event`, `listener`): `this`

Defined in: [src/types/TypedEventEmitter.ts:25](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L25)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### listener

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).on`

***

### once()

> **once**\<`E`\>(`event`, `listener`): `this`

Defined in: [src/types/TypedEventEmitter.ts:26](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L26)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### listener

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).once`

***

### onMessage()

> **onMessage**(`obj`): `void`

Defined in: [src/listener.ts:147](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L147)

#### Parameters

##### obj

###### command

`string`

###### data

`any`

#### Returns

`void`

***

### prependListener()

> **prependListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [src/types/TypedEventEmitter.ts:27](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L27)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### listener

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).prependListener`

***

### prependOnceListener()

> **prependOnceListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [src/types/TypedEventEmitter.ts:28](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L28)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### listener

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).prependOnceListener`

***

### rawListeners()

> **rawListeners**\<`E`\>(`event`): [`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\][]

Defined in: [src/types/TypedEventEmitter.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L43)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

#### Returns

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\][]

#### Inherited from

`(EventEmitter as new () => SpvEmitter).rawListeners`

***

### readBlock()

> **readBlock**(`__namedParameters`, `callback`): `Promise`\<`boolean`\>

Defined in: [src/listener.ts:404](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L404)

#### Parameters

##### \_\_namedParameters

###### hash

`string`

###### height

`number`

###### highWaterMark?

`number`

##### callback

(`params`) => `Promise`\<`any`\>

#### Returns

`Promise`\<`boolean`\>

***

### reconnect()

> **reconnect**(): `void`

Defined in: [src/listener.ts:118](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L118)

#### Returns

`void`

***

### removeAllListeners()

> **removeAllListeners**\<`E`\>(`event?`): `this`

Defined in: [src/types/TypedEventEmitter.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L34)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event?

`E`

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).removeAllListeners`

***

### removeListener()

> **removeListener**\<`E`\>(`event`, `listener`): `this`

Defined in: [src/types/TypedEventEmitter.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L35)

#### Type Parameters

##### E

`E` *extends* keyof [`SpvEvents`](../type-aliases/SpvEvents.md)

#### Parameters

##### event

`E`

##### listener

[`SpvEvents`](../type-aliases/SpvEvents.md)\[`E`\]

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).removeListener`

***

### rewindHeight()

> **rewindHeight**(`fromHeight`): `Promise`\<`boolean`\>

Defined in: [src/listener.ts:278](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L278)

#### Parameters

##### fromHeight

`number`

#### Returns

`Promise`\<`boolean`\>

***

### setMaxListeners()

> **setMaxListeners**(`maxListeners`): `this`

Defined in: [src/types/TypedEventEmitter.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L48)

#### Parameters

##### maxListeners

`number`

#### Returns

`this`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).setMaxListeners`

***

### syncBlocks()

> **syncBlocks**(`callback`, `options?`): `Promise`\<\{ `blockSize`: `number`; `processed`: `number`; `skipped`: `number`; \} \| `undefined`\>

Defined in: [src/listener.ts:283](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L283)

#### Parameters

##### callback

(`params`) => `void` \| `Promise`\<\{ `errors?`: `number`; `matches`: `number`; \}\> \| \{ `errors?`: `number`; `matches`: `number`; \}

##### options?

###### highWaterMark?

`number`

#### Returns

`Promise`\<\{ `blockSize`: `number`; `processed`: `number`; `skipped`: `number`; \} \| `undefined`\>
