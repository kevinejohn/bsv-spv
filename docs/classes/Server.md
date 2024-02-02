[bsv-spv](../README.md) / Server

# Class: Server

## Hierarchy

- [`Listener`](Listener.md)

  ↳ **`Server`**

## Table of contents

### Constructors

- [constructor](Server.md#constructor)

### Properties

- [MAX\_FILE\_SIZE](Server.md#max_file_size)
- [SHOW\_LOGS](Server.md#show_logs)
- [app](Server.md#app)
- [blockHeight](Server.md#blockheight)
- [client](Server.md#client)
- [db\_blocks](Server.md#db_blocks)
- [db\_headers](Server.md#db_headers)
- [db\_listener](Server.md#db_listener)
- [db\_mempool](Server.md#db_mempool)
- [disableInterval](Server.md#disableinterval)
- [headers](Server.md#headers)
- [host](Server.md#host)
- [interval](Server.md#interval)
- [mempool\_txs](Server.md#mempool_txs)
- [multithread](Server.md#multithread)
- [name](Server.md#name)
- [port](Server.md#port)
- [reconnectTime](Server.md#reconnecttime)
- [reconnectTimeout](Server.md#reconnecttimeout)
- [server](Server.md#server)
- [syncingBlocks](Server.md#syncingblocks)
- [ticker](Server.md#ticker)
- [txsSeen](Server.md#txsseen)
- [txsSize](Server.md#txssize)

### Methods

- [addListener](Server.md#addlistener)
- [connect](Server.md#connect)
- [disconnect](Server.md#disconnect)
- [emit](Server.md#emit)
- [eventNames](Server.md#eventnames)
- [getBlockInfo](Server.md#getblockinfo)
- [getMaxListeners](Server.md#getmaxlisteners)
- [listen](Server.md#listen)
- [listenerCount](Server.md#listenercount)
- [listeners](Server.md#listeners)
- [off](Server.md#off)
- [on](Server.md#on)
- [onMessage](Server.md#onmessage)
- [once](Server.md#once)
- [prependListener](Server.md#prependlistener)
- [prependOnceListener](Server.md#prependoncelistener)
- [rawListeners](Server.md#rawlisteners)
- [readBlock](Server.md#readblock)
- [reconnect](Server.md#reconnect)
- [removeAllListeners](Server.md#removealllisteners)
- [removeListener](Server.md#removelistener)
- [rewindHeight](Server.md#rewindheight)
- [setMaxListeners](Server.md#setmaxlisteners)
- [syncBlocks](Server.md#syncblocks)

## Constructors

### constructor

• **new Server**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `DEBUG_MEMORY?` | `boolean` |
| › `MAX_FILE_SIZE?` | `number` |
| › `dataDir` | `string` |
| › `disableInterval?` | `boolean` |
| › `mempool?` | `boolean` |
| › `name` | `string` |
| › `ticker` | `string` |

#### Overrides

[Listener](Listener.md).[constructor](Listener.md#constructor)

#### Defined in

[src/server.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L16)

## Properties

### MAX\_FILE\_SIZE

• **MAX\_FILE\_SIZE**: `number`

#### Defined in

[src/server.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L14)

___

### SHOW\_LOGS

• **SHOW\_LOGS**: `boolean`

#### Defined in

[src/server.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L12)

___

### app

• **app**: `Express`

#### Defined in

[src/server.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L10)

___

### blockHeight

• **blockHeight**: `number`

#### Inherited from

[Listener](Listener.md).[blockHeight](Listener.md#blockheight)

#### Defined in

[src/listener.ts:29](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L29)

___

### client

• `Optional` **client**: `Socket`

#### Inherited from

[Listener](Listener.md).[client](Listener.md#client)

#### Defined in

[src/listener.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L42)

___

### db\_blocks

• **db\_blocks**: [`DbBlocks`](DbBlocks.md)

#### Inherited from

[Listener](Listener.md).[db_blocks](Listener.md#db_blocks)

#### Defined in

[src/listener.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L36)

___

### db\_headers

• **db\_headers**: [`DbHeaders`](DbHeaders.md)

#### Inherited from

[Listener](Listener.md).[db_headers](Listener.md#db_headers)

#### Defined in

[src/listener.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L37)

___

### db\_listener

• **db\_listener**: [`DbListener`](DbListener.md)

#### Inherited from

[Listener](Listener.md).[db_listener](Listener.md#db_listener)

#### Defined in

[src/listener.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L38)

___

### db\_mempool

• `Optional` **db\_mempool**: [`DbMempool`](DbMempool.md)

#### Defined in

[src/server.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L13)

___

### disableInterval

• **disableInterval**: `undefined` \| `boolean`

#### Inherited from

[Listener](Listener.md).[disableInterval](Listener.md#disableinterval)

#### Defined in

[src/listener.ts:30](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L30)

___

### headers

• **headers**: `default`

#### Inherited from

[Listener](Listener.md).[headers](Listener.md#headers)

#### Defined in

[src/listener.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L39)

___

### host

• **host**: `string`

#### Inherited from

[Listener](Listener.md).[host](Listener.md#host)

#### Defined in

[src/listener.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L32)

___

### interval

• `Optional` **interval**: `Timeout`

#### Inherited from

[Listener](Listener.md).[interval](Listener.md#interval)

#### Defined in

[src/listener.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L41)

___

### mempool\_txs

• **mempool\_txs**: `boolean`

#### Inherited from

[Listener](Listener.md).[mempool_txs](Listener.md#mempool_txs)

#### Defined in

[src/listener.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L34)

___

### multithread

• `Optional` **multithread**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `threads` | `number` |

#### Inherited from

[Listener](Listener.md).[multithread](Listener.md#multithread)

#### Defined in

[src/listener.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L31)

___

### name

• **name**: `string`

#### Inherited from

[Listener](Listener.md).[name](Listener.md#name)

#### Defined in

[src/listener.ts:28](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L28)

___

### port

• **port**: `number`

#### Inherited from

[Listener](Listener.md).[port](Listener.md#port)

#### Defined in

[src/listener.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L33)

___

### reconnectTime

• **reconnectTime**: `number`

#### Inherited from

[Listener](Listener.md).[reconnectTime](Listener.md#reconnecttime)

#### Defined in

[src/listener.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L35)

___

### reconnectTimeout

• `Optional` **reconnectTimeout**: `Timeout`

#### Inherited from

[Listener](Listener.md).[reconnectTimeout](Listener.md#reconnecttimeout)

#### Defined in

[src/listener.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L40)

___

### server

• **server**: `Server`<typeof `IncomingMessage`, typeof `ServerResponse`\>

#### Defined in

[src/server.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L11)

___

### syncingBlocks

• **syncingBlocks**: `boolean`

#### Inherited from

[Listener](Listener.md).[syncingBlocks](Listener.md#syncingblocks)

#### Defined in

[src/listener.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L45)

___

### ticker

• **ticker**: `string`

#### Inherited from

[Listener](Listener.md).[ticker](Listener.md#ticker)

#### Defined in

[src/listener.ts:27](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L27)

___

### txsSeen

• **txsSeen**: `number`

#### Inherited from

[Listener](Listener.md).[txsSeen](Listener.md#txsseen)

#### Defined in

[src/listener.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L43)

___

### txsSize

• **txsSize**: `number`

#### Inherited from

[Listener](Listener.md).[txsSize](Listener.md#txssize)

#### Defined in

[src/listener.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L44)

## Methods

### addListener

▸ **addListener**<`E`\>(`event`, `listener`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | `SpvEvents`[`E`] |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[addListener](Listener.md#addlistener)

#### Defined in

[src/types/TypedEventEmitter.ts:24](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L24)

___

### connect

▸ **connect**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `host?` | `string` |
| › `mempool_txs?` | `boolean` |
| › `port` | `number` |

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[connect](Listener.md#connect)

#### Defined in

[src/listener.ts:187](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L187)

___

### disconnect

▸ **disconnect**(): `void`

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[disconnect](Listener.md#disconnect)

#### Defined in

[src/listener.ts:116](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L116)

___

### emit

▸ **emit**<`E`\>(`event`, `...args`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `...args` | `Parameters`<`SpvEvents`[`E`]\> |

#### Returns

`boolean`

#### Inherited from

[Listener](Listener.md).[emit](Listener.md#emit)

#### Defined in

[src/types/TypedEventEmitter.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L37)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[Listener](Listener.md).[eventNames](Listener.md#eventnames)

#### Defined in

[src/types/TypedEventEmitter.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L42)

___

### getBlockInfo

▸ **getBlockInfo**(`«destructured»`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hash` | `string` |
| › `height` | `number` |

#### Returns

`any`

#### Inherited from

[Listener](Listener.md).[getBlockInfo](Listener.md#getblockinfo)

#### Defined in

[src/listener.ts:389](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L389)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[Listener](Listener.md).[getMaxListeners](Listener.md#getmaxlisteners)

#### Defined in

[src/types/TypedEventEmitter.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L47)

___

### listen

▸ **listen**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Returns

`void`

#### Defined in

[src/server.ts:60](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L60)

___

### listenerCount

▸ **listenerCount**<`E`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

`number`

#### Inherited from

[Listener](Listener.md).[listenerCount](Listener.md#listenercount)

#### Defined in

[src/types/TypedEventEmitter.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L45)

___

### listeners

▸ **listeners**<`E`\>(`event`): `SpvEvents`[`E`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

`SpvEvents`[`E`][]

#### Inherited from

[Listener](Listener.md).[listeners](Listener.md#listeners)

#### Defined in

[src/types/TypedEventEmitter.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L44)

___

### off

▸ **off**<`E`\>(`event`, `listener`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | `SpvEvents`[`E`] |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[off](Listener.md#off)

#### Defined in

[src/types/TypedEventEmitter.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L33)

___

### on

▸ **on**<`E`\>(`event`, `listener`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | `SpvEvents`[`E`] |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[on](Listener.md#on)

#### Defined in

[src/types/TypedEventEmitter.ts:25](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L25)

___

### onMessage

▸ **onMessage**(`obj`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `obj.command` | `string` |
| `obj.data` | `any` |

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[onMessage](Listener.md#onmessage)

#### Defined in

[src/listener.ts:137](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L137)

___

### once

▸ **once**<`E`\>(`event`, `listener`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | `SpvEvents`[`E`] |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[once](Listener.md#once)

#### Defined in

[src/types/TypedEventEmitter.ts:26](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L26)

___

### prependListener

▸ **prependListener**<`E`\>(`event`, `listener`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | `SpvEvents`[`E`] |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[prependListener](Listener.md#prependlistener)

#### Defined in

[src/types/TypedEventEmitter.ts:27](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L27)

___

### prependOnceListener

▸ **prependOnceListener**<`E`\>(`event`, `listener`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | `SpvEvents`[`E`] |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[prependOnceListener](Listener.md#prependoncelistener)

#### Defined in

[src/types/TypedEventEmitter.ts:28](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L28)

___

### rawListeners

▸ **rawListeners**<`E`\>(`event`): `SpvEvents`[`E`][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

`SpvEvents`[`E`][]

#### Inherited from

[Listener](Listener.md).[rawListeners](Listener.md#rawlisteners)

#### Defined in

[src/types/TypedEventEmitter.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L43)

___

### readBlock

▸ **readBlock**(`«destructured»`, `callback`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hash` | `string` |
| › `height` | `number` |
| › `highWaterMark?` | `number` |
| `callback` | (`params`: `BlockStream`) => `Promise`<`any`\> |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Listener](Listener.md).[readBlock](Listener.md#readblock)

#### Defined in

[src/listener.ts:394](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L394)

___

### reconnect

▸ **reconnect**(): `void`

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[reconnect](Listener.md#reconnect)

#### Defined in

[src/listener.ts:109](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L109)

___

### removeAllListeners

▸ **removeAllListeners**<`E`\>(`event?`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `E` |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[removeAllListeners](Listener.md#removealllisteners)

#### Defined in

[src/types/TypedEventEmitter.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L34)

___

### removeListener

▸ **removeListener**<`E`\>(`event`, `listener`): [`Server`](Server.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | `SpvEvents`[`E`] |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[removeListener](Listener.md#removelistener)

#### Defined in

[src/types/TypedEventEmitter.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L35)

___

### rewindHeight

▸ **rewindHeight**(`fromHeight`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromHeight` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Listener](Listener.md).[rewindHeight](Listener.md#rewindheight)

#### Defined in

[src/listener.ts:268](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L268)

___

### setMaxListeners

▸ **setMaxListeners**(`maxListeners`): [`Server`](Server.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxListeners` | `number` |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[setMaxListeners](Listener.md#setmaxlisteners)

#### Defined in

[src/types/TypedEventEmitter.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L48)

___

### syncBlocks

▸ **syncBlocks**(`callback`, `options?`): `Promise`<`undefined` \| { `blockSize`: `number` ; `processed`: `number` ; `skipped`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`params`: `BlockStream`) => `void` \| `Promise`<{ `errors?`: `number` ; `matches`: `number`  }\> \| { `errors?`: `number` ; `matches`: `number`  } |
| `options?` | `Object` |
| `options.highWaterMark?` | `number` |

#### Returns

`Promise`<`undefined` \| { `blockSize`: `number` ; `processed`: `number` ; `skipped`: `number`  }\>

#### Inherited from

[Listener](Listener.md).[syncBlocks](Listener.md#syncblocks)

#### Defined in

[src/listener.ts:273](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L273)
