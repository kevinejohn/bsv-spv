[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / Spv

# Class: Spv

Defined in: [src/spv.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L39)

## Extends

- `TypedEventEmitter`\<[`SpvEvents`](../type-aliases/SpvEvents.md), `this`\>

## Constructors

### Constructor

> **new Spv**(`__namedParameters`): `Spv`

Defined in: [src/spv.ts:74](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L74)

#### Parameters

##### \_\_namedParameters

[`SpvOptions`](../interfaces/SpvOptions.md)

#### Returns

`Spv`

#### Overrides

`(EventEmitter as new () => SpvEmitter).constructor`

## Properties

### autoReconnect

> **autoReconnect**: `boolean`

Defined in: [src/spv.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L50)

***

### autoReconnectWait?

> `optional` **autoReconnectWait?**: `number`

Defined in: [src/spv.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L51)

***

### blockHeight

> **blockHeight**: `number`

Defined in: [src/spv.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L48)

***

### blocks

> **blocks**: `boolean`

Defined in: [src/spv.ts:67](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L67)

***

### connecting

> **connecting**: `boolean`

Defined in: [src/spv.ts:61](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L61)

***

### dataDir

> **dataDir**: `string`

Defined in: [src/spv.ts:69](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L69)

***

### db\_blocks

> **db\_blocks**: [`DbBlocks`](DbBlocks.md)

Defined in: [src/spv.ts:55](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L55)

***

### db\_headers

> **db\_headers**: [`DbHeaders`](DbHeaders.md)

Defined in: [src/spv.ts:56](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L56)

***

### db\_listener?

> `optional` **db\_listener?**: [`DbListener`](DbListener.md)

Defined in: [src/spv.ts:58](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L58)

***

### db\_nodes

> **db\_nodes**: [`DbNodes`](DbNodes.md)

Defined in: [src/spv.ts:57](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L57)

***

### DEBUG\_LOG

> **DEBUG\_LOG**: `boolean`

Defined in: [src/spv.ts:70](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L70)

***

### forceUserAgent?

> `optional` **forceUserAgent?**: `string`

Defined in: [src/spv.ts:49](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L49)

***

### genesisHeader?

> `optional` **genesisHeader?**: `string`

Defined in: [src/spv.ts:64](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L64)

***

### getPeersTimeout?

> `optional` **getPeersTimeout?**: `Timeout`

Defined in: [src/spv.ts:71](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L71)

***

### headers

> **headers**: `Headers`

Defined in: [src/spv.ts:54](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L54)

***

### id

> **id**: `string`

Defined in: [src/spv.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L40)

***

### magic?

> `optional` **magic?**: `string`

Defined in: [src/spv.ts:63](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L63)

***

### mempool

> **mempool**: `boolean`

Defined in: [src/spv.ts:66](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L66)

***

### node

> **node**: `string`

Defined in: [src/spv.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L43)

***

### peer?

> `optional` **peer?**: `Peer`

Defined in: [src/spv.ts:53](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L53)

***

### peerPingInterval?

> `optional` **peerPingInterval?**: `Timeout`

Defined in: [src/spv.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L72)

***

### pruneBlocks

> **pruneBlocks**: `number`

Defined in: [src/spv.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L47)

***

### queue\_nodes?

> `optional` **queue\_nodes?**: `string`[]

Defined in: [src/spv.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L45)

***

### saveMempool

> **saveMempool**: `boolean`

Defined in: [src/spv.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L46)

***

### syncingBlocks

> **syncingBlocks**: `boolean`

Defined in: [src/spv.ts:60](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L60)

***

### syncingHeaders?

> `optional` **syncingHeaders?**: `Promise`\<`number`\>

Defined in: [src/spv.ts:59](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L59)

***

### ticker

> **ticker**: `ChainTicker`

Defined in: [src/spv.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L42)

***

### timeoutConnect

> **timeoutConnect**: `number`

Defined in: [src/spv.ts:52](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L52)

***

### uid

> **uid**: `string`

Defined in: [src/spv.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L41)

***

### user\_agent?

> `optional` **user\_agent?**: `string`

Defined in: [src/spv.ts:62](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L62)

***

### validate

> **validate**: `boolean`

Defined in: [src/spv.ts:68](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L68)

***

### version?

> `optional` **version?**: `number`

Defined in: [src/spv.ts:65](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L65)

***

### versionOptions?

> `optional` **versionOptions?**: `VersionOptions`

Defined in: [src/spv.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L44)

## Methods

### addHeaders()

> **addHeaders**(`__namedParameters`): `Promise`\<`number`\>

Defined in: [src/spv.ts:151](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L151)

#### Parameters

##### \_\_namedParameters

###### headers

`Header`[]

#### Returns

`Promise`\<`number`\>

***

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

Defined in: [src/spv.ts:626](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L626)

#### Returns

`Promise`\<`void`\>

***

### connect()

> **connect**(`node?`): `Promise`\<`void`\>

Defined in: [src/spv.ts:215](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L215)

#### Parameters

##### node?

`string` = `...`

#### Returns

`Promise`\<`void`\>

***

### disconnect()

> **disconnect**(): `void`

Defined in: [src/spv.ts:611](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L611)

#### Returns

`void`

***

### downloadBlock()

> **downloadBlock**(`__namedParameters`): `Promise`\<`boolean`\>

Defined in: [src/spv.ts:679](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L679)

#### Parameters

##### \_\_namedParameters

###### hash

`string`

###### height

`number`

#### Returns

`Promise`\<`boolean`\>

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

### getBlockTx()

> **getBlockTx**(`__namedParameters`): `Promise`\<\{ `tx`: `Transaction` \| `undefined`; \}\>

Defined in: [src/spv.ts:664](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L664)

#### Parameters

##### \_\_namedParameters

###### block

`string`

###### len

`number`

###### pos

`number`

###### txid?

`string`

#### Returns

`Promise`\<\{ `tx`: `Transaction` \| `undefined`; \}\>

***

### getHash()

> **getHash**(`height`): `string`

Defined in: [src/spv.ts:641](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L641)

#### Parameters

##### height

`number`

#### Returns

`string`

***

### getHeader()

> **getHeader**(`__namedParameters`): `Header`

Defined in: [src/spv.ts:647](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L647)

#### Parameters

##### \_\_namedParameters

###### hash?

`string`

###### height

`number`

#### Returns

`Header`

***

### getHeight()

> **getHeight**(`hash?`): `number`

Defined in: [src/spv.ts:638](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L638)

#### Parameters

##### hash?

`string`

#### Returns

`number`

***

### getMaxListeners()

> **getMaxListeners**(): `number`

Defined in: [src/types/TypedEventEmitter.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/TypedEventEmitter.ts#L47)

#### Returns

`number`

#### Inherited from

`(EventEmitter as new () => SpvEmitter).getMaxListeners`

***

### getNodePeers()

> **getNodePeers**(): `Promise`\<\{ `addrs`: `NetAddress`[]; `node`: `string`; `port`: `number`; `ticker`: `string`; \}\>

Defined in: [src/spv.ts:652](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L652)

#### Returns

`Promise`\<\{ `addrs`: `NetAddress`[]; `node`: `string`; `port`: `number`; `ticker`: `string`; \}\>

***

### getTip()

> **getTip**(): `object`

Defined in: [src/spv.ts:644](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L644)

#### Returns

`object`

##### hash

> **hash**: `string`

##### height

> **height**: `number`

***

### isConnected()

> **isConnected**(): `boolean`

Defined in: [src/spv.ts:635](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L635)

#### Returns

`boolean`

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

Defined in: [src/spv.ts:693](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L693)

#### Parameters

##### \_\_namedParameters

###### hash

`string`

###### height

`number`

###### highWaterMark?

`number`

##### callback

(`params`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`boolean`\>

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

> **syncBlocks**(): `Promise`\<`number`\>

Defined in: [src/spv.ts:713](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L713)

#### Returns

`Promise`\<`number`\>

***

### syncHeaders()

> **syncHeaders**(): `Promise`\<`number`\>

Defined in: [src/spv.ts:174](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L174)

#### Returns

`Promise`\<`number`\>

***

### updateId()

> **updateId**(): `void`

Defined in: [src/spv.ts:139](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L139)

#### Returns

`void`

***

### warningPruneBlocks()

> **warningPruneBlocks**(): `Promise`\<`number`\>

Defined in: [src/spv.ts:745](https://github.com/kevinejohn/bsv-spv/blob/master/src/spv.ts#L745)

#### Returns

`Promise`\<`number`\>
