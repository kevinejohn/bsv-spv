[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / Server

# Class: Server

Defined in: [src/server.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L11)

## Extends

- [`Listener`](Listener.md)

## Constructors

### Constructor

> **new Server**(`__namedParameters`): `Server`

Defined in: [src/server.ts:18](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L18)

#### Parameters

##### \_\_namedParameters

###### dataDir

`string`

###### DEBUG_MEMORY?

`boolean` = `false`

###### disableInterval?

`boolean` = `false`

###### genesisHeader?

`string`

###### MAX_FILE_SIZE?

`number` = `...`

###### mempool?

`boolean` = `true`

###### name

`string`

###### ticker

`ChainTicker`

#### Returns

`Server`

#### Overrides

[`Listener`](Listener.md).[`constructor`](Listener.md#constructor)

## Properties

### app

> **app**: `Express`

Defined in: [src/server.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L12)

***

### blockHeight

> **blockHeight**: `number`

Defined in: [src/listener.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L31)

#### Inherited from

[`Listener`](Listener.md).[`blockHeight`](Listener.md#blockheight)

***

### client?

> `optional` **client?**: `Socket`

Defined in: [src/listener.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L44)

#### Inherited from

[`Listener`](Listener.md).[`client`](Listener.md#client)

***

### closing

> **closing**: `boolean`

Defined in: [src/listener.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L48)

#### Inherited from

[`Listener`](Listener.md).[`closing`](Listener.md#closing)

***

### db\_blocks

> **db\_blocks**: [`DbBlocks`](DbBlocks.md)

Defined in: [src/listener.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L38)

#### Inherited from

[`Listener`](Listener.md).[`db_blocks`](Listener.md#db_blocks)

***

### db\_headers

> **db\_headers**: [`DbHeaders`](DbHeaders.md)

Defined in: [src/listener.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L39)

#### Inherited from

[`Listener`](Listener.md).[`db_headers`](Listener.md#db_headers)

***

### db\_listener

> **db\_listener**: [`DbListener`](DbListener.md)

Defined in: [src/listener.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L40)

#### Inherited from

[`Listener`](Listener.md).[`db_listener`](Listener.md#db_listener)

***

### db\_mempool?

> `optional` **db\_mempool?**: [`DbMempool`](DbMempool.md)

Defined in: [src/server.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L15)

***

### disableInterval

> **disableInterval**: `boolean` \| `undefined`

Defined in: [src/listener.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L32)

#### Inherited from

[`Listener`](Listener.md).[`disableInterval`](Listener.md#disableinterval)

***

### headers

> **headers**: `Headers`

Defined in: [src/listener.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L41)

#### Inherited from

[`Listener`](Listener.md).[`headers`](Listener.md#headers)

***

### host

> **host**: `string`

Defined in: [src/listener.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L34)

#### Inherited from

[`Listener`](Listener.md).[`host`](Listener.md#host)

***

### interval?

> `optional` **interval?**: `Timeout`

Defined in: [src/listener.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L43)

#### Inherited from

[`Listener`](Listener.md).[`interval`](Listener.md#interval)

***

### MAX\_FILE\_SIZE

> **MAX\_FILE\_SIZE**: `number`

Defined in: [src/server.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L16)

***

### mempool\_txs

> **mempool\_txs**: `boolean`

Defined in: [src/listener.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L36)

#### Inherited from

[`Listener`](Listener.md).[`mempool_txs`](Listener.md#mempool_txs)

***

### multithread?

> `optional` **multithread?**: `object`

Defined in: [src/listener.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L33)

#### index

> **index**: `number`

#### threads

> **threads**: `number`

#### Inherited from

[`Listener`](Listener.md).[`multithread`](Listener.md#multithread)

***

### name

> **name**: `string`

Defined in: [src/listener.ts:30](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L30)

#### Inherited from

[`Listener`](Listener.md).[`name`](Listener.md#name)

***

### port

> **port**: `number`

Defined in: [src/listener.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L35)

#### Inherited from

[`Listener`](Listener.md).[`port`](Listener.md#port)

***

### reconnectTime

> **reconnectTime**: `number`

Defined in: [src/listener.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L37)

#### Inherited from

[`Listener`](Listener.md).[`reconnectTime`](Listener.md#reconnecttime)

***

### reconnectTimeout?

> `optional` **reconnectTimeout?**: `Timeout`

Defined in: [src/listener.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L42)

#### Inherited from

[`Listener`](Listener.md).[`reconnectTimeout`](Listener.md#reconnecttimeout)

***

### server

> **server**: `Server`

Defined in: [src/server.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L13)

***

### SHOW\_LOGS

> **SHOW\_LOGS**: `boolean`

Defined in: [src/server.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L14)

***

### syncingBlocks

> **syncingBlocks**: `boolean`

Defined in: [src/listener.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L47)

#### Inherited from

[`Listener`](Listener.md).[`syncingBlocks`](Listener.md#syncingblocks)

***

### ticker

> **ticker**: `ChainTicker`

Defined in: [src/listener.ts:29](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L29)

#### Inherited from

[`Listener`](Listener.md).[`ticker`](Listener.md#ticker)

***

### txsSeen

> **txsSeen**: `number`

Defined in: [src/listener.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L45)

#### Inherited from

[`Listener`](Listener.md).[`txsSeen`](Listener.md#txsseen)

***

### txsSize

> **txsSize**: `number`

Defined in: [src/listener.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L46)

#### Inherited from

[`Listener`](Listener.md).[`txsSize`](Listener.md#txssize)

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

[`Listener`](Listener.md).[`addListener`](Listener.md#addlistener)

***

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/server.ts:144](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L144)

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Listener`](Listener.md).[`close`](Listener.md#close)

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

#### Inherited from

[`Listener`](Listener.md).[`connect`](Listener.md#connect)

***

### disconnect()

> **disconnect**(): `void`

Defined in: [src/listener.ts:126](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L126)

#### Returns

`void`

#### Inherited from

[`Listener`](Listener.md).[`disconnect`](Listener.md#disconnect)

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

[`Listener`](Listener.md).[`emit`](Listener.md#emit)

***

### eventNames()

> **eventNames**(): (`string` \| `symbol`)[]

Defined in: [src/types/TypedEventEmitter.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L42)

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[`Listener`](Listener.md).[`eventNames`](Listener.md#eventnames)

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

#### Inherited from

[`Listener`](Listener.md).[`getBlockInfo`](Listener.md#getblockinfo)

***

### getMaxListeners()

> **getMaxListeners**(): `number`

Defined in: [src/types/TypedEventEmitter.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L47)

#### Returns

`number`

#### Inherited from

[`Listener`](Listener.md).[`getMaxListeners`](Listener.md#getmaxlisteners)

***

### listen()

> **listen**(`__namedParameters`): `void`

Defined in: [src/server.ts:66](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L66)

#### Parameters

##### \_\_namedParameters

###### host?

`string` = `"localhost"`

###### port?

`number` = `8081`

###### SHOW_LOGS?

`boolean` = `true`

#### Returns

`void`

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

[`Listener`](Listener.md).[`listenerCount`](Listener.md#listenercount)

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

[`Listener`](Listener.md).[`listeners`](Listener.md#listeners)

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

[`Listener`](Listener.md).[`off`](Listener.md#off)

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

[`Listener`](Listener.md).[`on`](Listener.md#on)

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

[`Listener`](Listener.md).[`once`](Listener.md#once)

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

#### Inherited from

[`Listener`](Listener.md).[`onMessage`](Listener.md#onmessage)

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

[`Listener`](Listener.md).[`prependListener`](Listener.md#prependlistener)

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

[`Listener`](Listener.md).[`prependOnceListener`](Listener.md#prependoncelistener)

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

[`Listener`](Listener.md).[`rawListeners`](Listener.md#rawlisteners)

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

#### Inherited from

[`Listener`](Listener.md).[`readBlock`](Listener.md#readblock)

***

### reconnect()

> **reconnect**(): `void`

Defined in: [src/listener.ts:118](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L118)

#### Returns

`void`

#### Inherited from

[`Listener`](Listener.md).[`reconnect`](Listener.md#reconnect)

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

[`Listener`](Listener.md).[`removeAllListeners`](Listener.md#removealllisteners)

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

[`Listener`](Listener.md).[`removeListener`](Listener.md#removelistener)

***

### rewindHeight()

> **rewindHeight**(`fromHeight`): `Promise`\<`boolean`\>

Defined in: [src/listener.ts:278](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L278)

#### Parameters

##### fromHeight

`number`

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`Listener`](Listener.md).[`rewindHeight`](Listener.md#rewindheight)

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

[`Listener`](Listener.md).[`setMaxListeners`](Listener.md#setmaxlisteners)

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

#### Inherited from

[`Listener`](Listener.md).[`syncBlocks`](Listener.md#syncblocks)
