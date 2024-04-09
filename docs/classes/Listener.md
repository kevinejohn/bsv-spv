[bsv-spv](../README.md) / Listener

# Class: Listener

## Hierarchy

- `TypedEventEmitter`<`SpvEvents`, `this`\>

  ↳ **`Listener`**

  ↳↳ [`Server`](Server.md)

## Table of contents

### Constructors

- [constructor](Listener.md#constructor)

### Properties

- [blockHeight](Listener.md#blockheight)
- [client](Listener.md#client)
- [db\_blocks](Listener.md#db_blocks)
- [db\_headers](Listener.md#db_headers)
- [db\_listener](Listener.md#db_listener)
- [disableInterval](Listener.md#disableinterval)
- [headers](Listener.md#headers)
- [host](Listener.md#host)
- [interval](Listener.md#interval)
- [mempool\_txs](Listener.md#mempool_txs)
- [multithread](Listener.md#multithread)
- [name](Listener.md#name)
- [port](Listener.md#port)
- [reconnectTime](Listener.md#reconnecttime)
- [reconnectTimeout](Listener.md#reconnecttimeout)
- [syncingBlocks](Listener.md#syncingblocks)
- [ticker](Listener.md#ticker)
- [txsSeen](Listener.md#txsseen)
- [txsSize](Listener.md#txssize)

### Methods

- [addListener](Listener.md#addlistener)
- [connect](Listener.md#connect)
- [disconnect](Listener.md#disconnect)
- [emit](Listener.md#emit)
- [eventNames](Listener.md#eventnames)
- [getBlockInfo](Listener.md#getblockinfo)
- [getMaxListeners](Listener.md#getmaxlisteners)
- [listenerCount](Listener.md#listenercount)
- [listeners](Listener.md#listeners)
- [off](Listener.md#off)
- [on](Listener.md#on)
- [onMessage](Listener.md#onmessage)
- [once](Listener.md#once)
- [prependListener](Listener.md#prependlistener)
- [prependOnceListener](Listener.md#prependoncelistener)
- [rawListeners](Listener.md#rawlisteners)
- [readBlock](Listener.md#readblock)
- [reconnect](Listener.md#reconnect)
- [removeAllListeners](Listener.md#removealllisteners)
- [removeListener](Listener.md#removelistener)
- [rewindHeight](Listener.md#rewindheight)
- [setMaxListeners](Listener.md#setmaxlisteners)
- [syncBlocks](Listener.md#syncblocks)

## Constructors

### constructor

• **new Listener**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ListenerOptions`](../interfaces/ListenerOptions.md) |

#### Overrides

(EventEmitter as new () &#x3D;\&gt; SpvEmitter).constructor

#### Defined in

[src/listener.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L48)

## Properties

### blockHeight

• **blockHeight**: `number`

#### Defined in

[src/listener.ts:30](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L30)

___

### client

• `Optional` **client**: `Socket`

#### Defined in

[src/listener.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L43)

___

### db\_blocks

• **db\_blocks**: [`DbBlocks`](DbBlocks.md)

#### Defined in

[src/listener.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L37)

___

### db\_headers

• **db\_headers**: [`DbHeaders`](DbHeaders.md)

#### Defined in

[src/listener.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L38)

___

### db\_listener

• **db\_listener**: [`DbListener`](DbListener.md)

#### Defined in

[src/listener.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L39)

___

### disableInterval

• **disableInterval**: `undefined` \| `boolean`

#### Defined in

[src/listener.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L31)

___

### headers

• **headers**: `default`

#### Defined in

[src/listener.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L40)

___

### host

• **host**: `string`

#### Defined in

[src/listener.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L33)

___

### interval

• `Optional` **interval**: `Timeout`

#### Defined in

[src/listener.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L42)

___

### mempool\_txs

• **mempool\_txs**: `boolean`

#### Defined in

[src/listener.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L35)

___

### multithread

• `Optional` **multithread**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `threads` | `number` |

#### Defined in

[src/listener.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L32)

___

### name

• **name**: `string`

#### Defined in

[src/listener.ts:29](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L29)

___

### port

• **port**: `number`

#### Defined in

[src/listener.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L34)

___

### reconnectTime

• **reconnectTime**: `number`

#### Defined in

[src/listener.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L36)

___

### reconnectTimeout

• `Optional` **reconnectTimeout**: `Timeout`

#### Defined in

[src/listener.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L41)

___

### syncingBlocks

• **syncingBlocks**: `boolean`

#### Defined in

[src/listener.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L46)

___

### ticker

• **ticker**: `string`

#### Defined in

[src/listener.ts:28](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L28)

___

### txsSeen

• **txsSeen**: `number`

#### Defined in

[src/listener.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L44)

___

### txsSize

• **txsSize**: `number`

#### Defined in

[src/listener.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L45)

## Methods

### addListener

▸ **addListener**<`E`\>(`event`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).addListener

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

#### Defined in

[src/listener.ts:189](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L189)

___

### disconnect

▸ **disconnect**(): `void`

#### Returns

`void`

#### Defined in

[src/listener.ts:118](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L118)

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

(EventEmitter as new () =\> SpvEmitter).emit

#### Defined in

[src/types/TypedEventEmitter.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L37)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).eventNames

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

#### Defined in

[src/listener.ts:391](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L391)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).getMaxListeners

#### Defined in

[src/types/TypedEventEmitter.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L47)

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

(EventEmitter as new () =\> SpvEmitter).listenerCount

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

(EventEmitter as new () =\> SpvEmitter).listeners

#### Defined in

[src/types/TypedEventEmitter.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L44)

___

### off

▸ **off**<`E`\>(`event`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).off

#### Defined in

[src/types/TypedEventEmitter.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L33)

___

### on

▸ **on**<`E`\>(`event`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).on

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

#### Defined in

[src/listener.ts:139](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L139)

___

### once

▸ **once**<`E`\>(`event`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).once

#### Defined in

[src/types/TypedEventEmitter.ts:26](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L26)

___

### prependListener

▸ **prependListener**<`E`\>(`event`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).prependListener

#### Defined in

[src/types/TypedEventEmitter.ts:27](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L27)

___

### prependOnceListener

▸ **prependOnceListener**<`E`\>(`event`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).prependOnceListener

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

(EventEmitter as new () =\> SpvEmitter).rawListeners

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

#### Defined in

[src/listener.ts:396](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L396)

___

### reconnect

▸ **reconnect**(): `void`

#### Returns

`void`

#### Defined in

[src/listener.ts:111](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L111)

___

### removeAllListeners

▸ **removeAllListeners**<`E`\>(`event?`): [`Listener`](Listener.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `E` |

#### Returns

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).removeAllListeners

#### Defined in

[src/types/TypedEventEmitter.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L34)

___

### removeListener

▸ **removeListener**<`E`\>(`event`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).removeListener

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

#### Defined in

[src/listener.ts:270](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L270)

___

### setMaxListeners

▸ **setMaxListeners**(`maxListeners`): [`Listener`](Listener.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxListeners` | `number` |

#### Returns

[`Listener`](Listener.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).setMaxListeners

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

#### Defined in

[src/listener.ts:275](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L275)
