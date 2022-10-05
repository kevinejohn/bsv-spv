[bsv-spv](../README.md) / Server

# Class: Server

## Hierarchy

- [`Listener`](Listener.md)

  ↳ **`Server`**

## Table of contents

### Constructors

- [constructor](Server.md#constructor)

### Properties

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
- [multithread](Server.md#multithread)
- [name](Server.md#name)
- [port](Server.md#port)
- [promiseSyncBlock](Server.md#promisesyncblock)
- [reconnectTime](Server.md#reconnecttime)
- [reconnectTimeout](Server.md#reconnecttimeout)
- [server](Server.md#server)
- [ticker](Server.md#ticker)
- [txsSeen](Server.md#txsseen)
- [txsSize](Server.md#txssize)
- [captureRejectionSymbol](Server.md#capturerejectionsymbol)
- [captureRejections](Server.md#capturerejections)
- [defaultMaxListeners](Server.md#defaultmaxlisteners)
- [errorMonitor](Server.md#errormonitor)

### Methods

- [addListener](Server.md#addlistener)
- [connect](Server.md#connect)
- [disconnect](Server.md#disconnect)
- [emit](Server.md#emit)
- [eventNames](Server.md#eventnames)
- [getBlockInfo](Server.md#getblockinfo)
- [getMaxListeners](Server.md#getmaxlisteners)
- [getMempoolTxs](Server.md#getmempooltxs)
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
- [setMaxListeners](Server.md#setmaxlisteners)
- [syncBlocks](Server.md#syncblocks)
- [getEventListeners](Server.md#geteventlisteners)
- [listenerCount](Server.md#listenercount-1)
- [on](Server.md#on-1)
- [once](Server.md#once-1)
- [setMaxListeners](Server.md#setmaxlisteners-1)

## Constructors

### constructor

• **new Server**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.DEBUG_MEMORY?` | `boolean` |
| `__namedParameters.MAX_FILE_SIZE?` | `number` |
| `__namedParameters.dataDir` | `string` |
| `__namedParameters.disableInterval?` | `boolean` |
| `__namedParameters.name` | `string` |
| `__namedParameters.ticker` | `string` |

#### Overrides

[Listener](Listener.md).[constructor](Listener.md#constructor)

#### Defined in

[src/server.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L11)

## Properties

### SHOW\_LOGS

• **SHOW\_LOGS**: `boolean`

#### Defined in

[src/server.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L9)

___

### app

• **app**: `any`

#### Defined in

[src/server.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L7)

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

• **db\_mempool**: [`DbMempool`](DbMempool.md)

#### Inherited from

[Listener](Listener.md).[db_mempool](Listener.md#db_mempool)

#### Defined in

[src/listener.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L35)

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

• `Optional` **interval**: `Timer`

#### Inherited from

[Listener](Listener.md).[interval](Listener.md#interval)

#### Defined in

[src/listener.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L41)

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

### promiseSyncBlock

• `Optional` **promiseSyncBlock**: `Promise`<{ `blockSize`: `number` ; `processed`: `number` ; `skipped`: `number`  }\>

#### Inherited from

[Listener](Listener.md).[promiseSyncBlock](Listener.md#promisesyncblock)

#### Defined in

[src/listener.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L45)

___

### reconnectTime

• **reconnectTime**: `number`

#### Inherited from

[Listener](Listener.md).[reconnectTime](Listener.md#reconnecttime)

#### Defined in

[src/listener.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L34)

___

### reconnectTimeout

• `Optional` **reconnectTimeout**: `Timeout`

#### Inherited from

[Listener](Listener.md).[reconnectTimeout](Listener.md#reconnecttimeout)

#### Defined in

[src/listener.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L40)

___

### server

• **server**: `any`

#### Defined in

[src/server.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L8)

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

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](Spv.md#capturerejectionsymbol)

#### Inherited from

[Listener](Listener.md).[captureRejectionSymbol](Listener.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:291

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

[Listener](Listener.md).[captureRejections](Listener.md#capturerejections)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:296

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[Listener](Listener.md).[defaultMaxListeners](Listener.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:297

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](Spv.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

[Listener](Listener.md).[errorMonitor](Listener.md#errormonitor)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:290

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`Server`](Server.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[addListener](Listener.md#addlistener)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:317

___

### connect

▸ **connect**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.host?` | `string` |
| `__namedParameters.port` | `number` |

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[connect](Listener.md#connect)

#### Defined in

[src/listener.ts:178](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L178)

___

### disconnect

▸ **disconnect**(): `void`

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[disconnect](Listener.md#disconnect)

#### Defined in

[src/listener.ts:120](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L120)

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

[Listener](Listener.md).[emit](Listener.md#emit)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:573

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[Listener](Listener.md).[eventNames](Listener.md#eventnames)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:632

___

### getBlockInfo

▸ **getBlockInfo**(`__namedParameters`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.hash` | `string` |
| `__namedParameters.height` | `number` |

#### Returns

`any`

#### Inherited from

[Listener](Listener.md).[getBlockInfo](Listener.md#getblockinfo)

#### Defined in

[src/listener.ts:361](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L361)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](Server.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

[Listener](Listener.md).[getMaxListeners](Listener.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:489

___

### getMempoolTxs

▸ **getMempoolTxs**(`txids`, `getTime`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `txids` | `string`[] |
| `getTime` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `times` | (``null`` \| `number`)[] |
| `txs` | `default`[] |

#### Inherited from

[Listener](Listener.md).[getMempoolTxs](Listener.md#getmempooltxs)

#### Defined in

[src/listener.ts:379](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L379)

___

### listen

▸ **listen**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |

#### Returns

`void`

#### Defined in

[src/server.ts:112](https://github.com/kevinejohn/bsv-spv/blob/master/src/server.ts#L112)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

[Listener](Listener.md).[listenerCount](Listener.md#listenercount)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:579

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Listener](Listener.md).[listeners](Listener.md#listeners)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:502

___

### off

▸ **off**(`eventName`, `listener`): [`Server`](Server.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[off](Listener.md#off)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:462

___

### on

▸ **on**(`eventName`, `listener`): [`Server`](Server.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[on](Listener.md#on)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:348

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

[src/listener.ts:141](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L141)

___

### once

▸ **once**(`eventName`, `listener`): [`Server`](Server.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[once](Listener.md#once)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:377

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Server`](Server.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[prependListener](Listener.md#prependlistener)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:597

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Server`](Server.md)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[prependOnceListener](Listener.md#prependoncelistener)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:613

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`Since`**

v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Listener](Listener.md).[rawListeners](Listener.md#rawlisteners)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:532

___

### readBlock

▸ **readBlock**(`__namedParameters`, `callback`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.hash` | `string` |
| `__namedParameters.height` | `number` |
| `callback` | (`params`: `BlockStream`) => `Promise`<`any`\> |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Listener](Listener.md).[readBlock](Listener.md#readblock)

#### Defined in

[src/listener.ts:366](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L366)

___

### reconnect

▸ **reconnect**(): `void`

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[reconnect](Listener.md#reconnect)

#### Defined in

[src/listener.ts:113](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L113)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Server`](Server.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[removeAllListeners](Listener.md#removealllisteners)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:473

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Server`](Server.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[removeListener](Listener.md#removelistener)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:457

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Server`](Server.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Server`](Server.md)

#### Inherited from

[Listener](Listener.md).[setMaxListeners](Listener.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:483

___

### syncBlocks

▸ **syncBlocks**(`callback`): `Promise`<{ `blockSize`: `number` ; `processed`: `number` ; `skipped`: `number`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`params`: `BlockStream`) => `void` \| `Promise`<{ `errors?`: `number` ; `matches`: `number`  }\> \| { `errors?`: `number` ; `matches`: `number`  } |

#### Returns

`Promise`<{ `blockSize`: `number` ; `processed`: `number` ; `skipped`: `number`  }\>

#### Inherited from

[Listener](Listener.md).[syncBlocks](Listener.md#syncblocks)

#### Defined in

[src/listener.ts:253](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L253)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`Since`**

v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Listener](Listener.md).[getEventListeners](Listener.md#geteventlisteners)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:262

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

[Listener](Listener.md).[listenerCount](Listener.md#listenercount-1)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`Since`**

v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

[Listener](Listener.md).[on](Listener.md#on-1)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:217

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`Since`**

v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[Listener](Listener.md).[once](Listener.md#once-1)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[Listener](Listener.md).[once](Listener.md#once-1)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:158

___

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, ...`eventTargets`): `void`

```js
const {
  setMaxListeners,
  EventEmitter
} = require('events');

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

**`Since`**

v15.4.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `DOMEventTarget`)[] | - |

#### Returns

`void`

#### Inherited from

[Listener](Listener.md).[setMaxListeners](Listener.md#setmaxlisteners-1)

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:280
