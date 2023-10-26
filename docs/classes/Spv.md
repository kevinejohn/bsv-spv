[bsv-spv](../README.md) / Spv

# Class: Spv

## Hierarchy

- `TypedEventEmitter`<`SpvEvents`, `this`\>

  ↳ **`Spv`**

## Table of contents

### Constructors

- [constructor](Spv.md#constructor)

### Properties

- [DEBUG\_LOG](Spv.md#debug_log)
- [autoReconnect](Spv.md#autoreconnect)
- [autoReconnectWait](Spv.md#autoreconnectwait)
- [blockHeight](Spv.md#blockheight)
- [blocks](Spv.md#blocks)
- [connecting](Spv.md#connecting)
- [dataDir](Spv.md#datadir)
- [db\_blocks](Spv.md#db_blocks)
- [db\_headers](Spv.md#db_headers)
- [db\_listener](Spv.md#db_listener)
- [db\_nodes](Spv.md#db_nodes)
- [forceUserAgent](Spv.md#forceuseragent)
- [getPeersTimeout](Spv.md#getpeerstimeout)
- [headers](Spv.md#headers)
- [id](Spv.md#id)
- [mempool](Spv.md#mempool)
- [node](Spv.md#node)
- [peer](Spv.md#peer)
- [peerPingInterval](Spv.md#peerpinginterval)
- [pruneBlocks](Spv.md#pruneblocks)
- [queue\_nodes](Spv.md#queue_nodes)
- [saveMempool](Spv.md#savemempool)
- [syncingBlocks](Spv.md#syncingblocks)
- [syncingHeaders](Spv.md#syncingheaders)
- [ticker](Spv.md#ticker)
- [timeoutConnect](Spv.md#timeoutconnect)
- [uid](Spv.md#uid)
- [user\_agent](Spv.md#user_agent)
- [validate](Spv.md#validate)
- [version](Spv.md#version)
- [versionOptions](Spv.md#versionoptions)

### Methods

- [addHeaders](Spv.md#addheaders)
- [addListener](Spv.md#addlistener)
- [connect](Spv.md#connect)
- [disconnect](Spv.md#disconnect)
- [downloadBlock](Spv.md#downloadblock)
- [emit](Spv.md#emit)
- [eventNames](Spv.md#eventnames)
- [getBlockTx](Spv.md#getblocktx)
- [getHash](Spv.md#gethash)
- [getHeader](Spv.md#getheader)
- [getHeight](Spv.md#getheight)
- [getMaxListeners](Spv.md#getmaxlisteners)
- [getNodePeers](Spv.md#getnodepeers)
- [getTip](Spv.md#gettip)
- [isConnected](Spv.md#isconnected)
- [listenerCount](Spv.md#listenercount)
- [listeners](Spv.md#listeners)
- [off](Spv.md#off)
- [on](Spv.md#on)
- [once](Spv.md#once)
- [prependListener](Spv.md#prependlistener)
- [prependOnceListener](Spv.md#prependoncelistener)
- [rawListeners](Spv.md#rawlisteners)
- [readBlock](Spv.md#readblock)
- [removeAllListeners](Spv.md#removealllisteners)
- [removeListener](Spv.md#removelistener)
- [setMaxListeners](Spv.md#setmaxlisteners)
- [syncBlocks](Spv.md#syncblocks)
- [syncHeaders](Spv.md#syncheaders)
- [updateId](Spv.md#updateid)
- [warningPruneBlocks](Spv.md#warningpruneblocks)

## Constructors

### constructor

• **new Spv**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`SpvOptions`](../interfaces/SpvOptions.md) |

#### Overrides

(EventEmitter as new () &#x3D;\&gt; SpvEmitter).constructor

#### Defined in

[src/spv.ts:69](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L69)

## Properties

### DEBUG\_LOG

• **DEBUG\_LOG**: `boolean`

#### Defined in

[src/spv.ts:65](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L65)

___

### autoReconnect

• **autoReconnect**: `boolean`

#### Defined in

[src/spv.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L47)

___

### autoReconnectWait

• `Optional` **autoReconnectWait**: `number`

#### Defined in

[src/spv.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L48)

___

### blockHeight

• **blockHeight**: `number`

#### Defined in

[src/spv.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L45)

___

### blocks

• **blocks**: `boolean`

#### Defined in

[src/spv.ts:62](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L62)

___

### connecting

• **connecting**: `boolean`

#### Defined in

[src/spv.ts:58](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L58)

___

### dataDir

• **dataDir**: `string`

#### Defined in

[src/spv.ts:64](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L64)

___

### db\_blocks

• **db\_blocks**: [`DbBlocks`](DbBlocks.md)

#### Defined in

[src/spv.ts:52](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L52)

___

### db\_headers

• **db\_headers**: [`DbHeaders`](DbHeaders.md)

#### Defined in

[src/spv.ts:53](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L53)

___

### db\_listener

• `Optional` **db\_listener**: [`DbListener`](DbListener.md)

#### Defined in

[src/spv.ts:55](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L55)

___

### db\_nodes

• **db\_nodes**: [`DbNodes`](DbNodes.md)

#### Defined in

[src/spv.ts:54](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L54)

___

### forceUserAgent

• `Optional` **forceUserAgent**: `string`

#### Defined in

[src/spv.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L46)

___

### getPeersTimeout

• `Optional` **getPeersTimeout**: `Timeout`

#### Defined in

[src/spv.ts:66](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L66)

___

### headers

• **headers**: `default`

#### Defined in

[src/spv.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L51)

___

### id

• **id**: `string`

#### Defined in

[src/spv.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L37)

___

### mempool

• **mempool**: `boolean`

#### Defined in

[src/spv.ts:61](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L61)

___

### node

• **node**: `string`

#### Defined in

[src/spv.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L40)

___

### peer

• `Optional` **peer**: `default`

#### Defined in

[src/spv.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L50)

___

### peerPingInterval

• `Optional` **peerPingInterval**: `Timeout`

#### Defined in

[src/spv.ts:67](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L67)

___

### pruneBlocks

• **pruneBlocks**: `number`

#### Defined in

[src/spv.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L44)

___

### queue\_nodes

• `Optional` **queue\_nodes**: `string`[]

#### Defined in

[src/spv.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L42)

___

### saveMempool

• **saveMempool**: `boolean`

#### Defined in

[src/spv.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L43)

___

### syncingBlocks

• **syncingBlocks**: `boolean`

#### Defined in

[src/spv.ts:57](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L57)

___

### syncingHeaders

• `Optional` **syncingHeaders**: `Promise`<`number`\>

#### Defined in

[src/spv.ts:56](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L56)

___

### ticker

• **ticker**: `string`

#### Defined in

[src/spv.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L39)

___

### timeoutConnect

• **timeoutConnect**: `number`

#### Defined in

[src/spv.ts:49](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L49)

___

### uid

• **uid**: `string`

#### Defined in

[src/spv.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L38)

___

### user\_agent

• `Optional` **user\_agent**: `string`

#### Defined in

[src/spv.ts:59](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L59)

___

### validate

• **validate**: `boolean`

#### Defined in

[src/spv.ts:63](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L63)

___

### version

• `Optional` **version**: `number`

#### Defined in

[src/spv.ts:60](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L60)

___

### versionOptions

• `Optional` **versionOptions**: `VersionOptions`

#### Defined in

[src/spv.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L41)

## Methods

### addHeaders

▸ **addHeaders**(`«destructured»`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `headers` | `default`[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/spv.ts:138](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L138)

___

### addListener

▸ **addListener**<`E`\>(`event`, `listener`): [`Spv`](Spv.md)

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

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).addListener

#### Defined in

[src/types/TypedEventEmitter.ts:24](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L24)

___

### connect

▸ **connect**(`node?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/spv.ts:202](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L202)

___

### disconnect

▸ **disconnect**(): `void`

#### Returns

`void`

#### Defined in

[src/spv.ts:596](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L596)

___

### downloadBlock

▸ **downloadBlock**(`«destructured»`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hash` | `string` |
| › `height` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/spv.ts:655](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L655)

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

### getBlockTx

▸ **getBlockTx**(`«destructured»`): `Promise`<{ `tx`: `undefined` \| `default`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `block` | `string` |
| › `len` | `number` |
| › `pos` | `number` |
| › `txid?` | `string` |

#### Returns

`Promise`<{ `tx`: `undefined` \| `default`  }\>

#### Defined in

[src/spv.ts:640](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L640)

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

[src/spv.ts:617](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L617)

___

### getHeader

▸ **getHeader**(`«destructured»`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hash?` | `string` |
| › `height` | `number` |

#### Returns

`default`

#### Defined in

[src/spv.ts:623](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L623)

___

### getHeight

▸ **getHeight**(`hash?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash?` | `string` |

#### Returns

`number`

#### Defined in

[src/spv.ts:614](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L614)

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

### getNodePeers

▸ **getNodePeers**(): `Promise`<{ `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }\>

#### Returns

`Promise`<{ `addrs`: `NetAddress`[] ; `node`: `string` ; `port`: `number` ; `ticker`: `string`  }\>

#### Defined in

[src/spv.ts:628](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L628)

___

### getTip

▸ **getTip**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `height` | `number` |

#### Defined in

[src/spv.ts:620](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L620)

___

### isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/spv.ts:611](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L611)

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

▸ **off**<`E`\>(`event`, `listener`): [`Spv`](Spv.md)

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

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).off

#### Defined in

[src/types/TypedEventEmitter.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L33)

___

### on

▸ **on**<`E`\>(`event`, `listener`): [`Spv`](Spv.md)

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

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).on

#### Defined in

[src/types/TypedEventEmitter.ts:25](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L25)

___

### once

▸ **once**<`E`\>(`event`, `listener`): [`Spv`](Spv.md)

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

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).once

#### Defined in

[src/types/TypedEventEmitter.ts:26](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L26)

___

### prependListener

▸ **prependListener**<`E`\>(`event`, `listener`): [`Spv`](Spv.md)

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

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).prependListener

#### Defined in

[src/types/TypedEventEmitter.ts:27](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L27)

___

### prependOnceListener

▸ **prependOnceListener**<`E`\>(`event`, `listener`): [`Spv`](Spv.md)

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

[`Spv`](Spv.md)

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
| `callback` | (`params`: `any`) => `Promise`<`void`\> |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/spv.ts:669](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L669)

___

### removeAllListeners

▸ **removeAllListeners**<`E`\>(`event?`): [`Spv`](Spv.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends keyof `SpvEvents` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `E` |

#### Returns

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).removeAllListeners

#### Defined in

[src/types/TypedEventEmitter.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L34)

___

### removeListener

▸ **removeListener**<`E`\>(`event`, `listener`): [`Spv`](Spv.md)

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

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).removeListener

#### Defined in

[src/types/TypedEventEmitter.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L35)

___

### setMaxListeners

▸ **setMaxListeners**(`maxListeners`): [`Spv`](Spv.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxListeners` | `number` |

#### Returns

[`Spv`](Spv.md)

#### Inherited from

(EventEmitter as new () =\> SpvEmitter).setMaxListeners

#### Defined in

[src/types/TypedEventEmitter.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L48)

___

### syncBlocks

▸ **syncBlocks**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[src/spv.ts:682](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L682)

___

### syncHeaders

▸ **syncHeaders**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[src/spv.ts:161](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L161)

___

### updateId

▸ **updateId**(): `void`

#### Returns

`void`

#### Defined in

[src/spv.ts:126](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L126)

___

### warningPruneBlocks

▸ **warningPruneBlocks**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[src/spv.ts:714](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L714)
