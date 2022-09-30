[bsv-spv](../README.md) / Listener

# Class: Listener

## Hierarchy

- `EventEmitter`

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
- [db\_mempool](Listener.md#db_mempool)
- [db\_plugin](Listener.md#db_plugin)
- [disableInterval](Listener.md#disableinterval)
- [headers](Listener.md#headers)
- [host](Listener.md#host)
- [interval](Listener.md#interval)
- [multithread](Listener.md#multithread)
- [name](Listener.md#name)
- [port](Listener.md#port)
- [promiseSyncBlock](Listener.md#promisesyncblock)
- [reconnectTime](Listener.md#reconnecttime)
- [reconnectTimeout](Listener.md#reconnecttimeout)
- [ticker](Listener.md#ticker)
- [txsSeen](Listener.md#txsseen)
- [txsSize](Listener.md#txssize)
- [captureRejectionSymbol](Listener.md#capturerejectionsymbol)
- [captureRejections](Listener.md#capturerejections)
- [defaultMaxListeners](Listener.md#defaultmaxlisteners)
- [errorMonitor](Listener.md#errormonitor)

### Methods

- [addListener](Listener.md#addlistener)
- [connect](Listener.md#connect)
- [disconnect](Listener.md#disconnect)
- [emit](Listener.md#emit)
- [eventNames](Listener.md#eventnames)
- [getBlockInfo](Listener.md#getblockinfo)
- [getMaxListeners](Listener.md#getmaxlisteners)
- [getMempoolTxs](Listener.md#getmempooltxs)
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
- [setMaxListeners](Listener.md#setmaxlisteners)
- [syncBlocks](Listener.md#syncblocks)
- [getEventListeners](Listener.md#geteventlisteners)
- [listenerCount](Listener.md#listenercount-1)
- [on](Listener.md#on-1)
- [once](Listener.md#once-1)
- [setMaxListeners](Listener.md#setmaxlisteners-1)

## Constructors

### constructor

• **new Listener**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ListenerOptions`](../interfaces/ListenerOptions.md) |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/listener.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L51)

## Properties

### blockHeight

• **blockHeight**: `number`

#### Defined in

[src/listener.ts:29](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L29)

___

### client

• `Optional` **client**: `Socket`

#### Defined in

[src/listener.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L42)

___

### db\_blocks

• **db\_blocks**: [`DbBlocks`](DbBlocks.md)

#### Defined in

[src/listener.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L36)

___

### db\_headers

• **db\_headers**: [`DbHeaders`](DbHeaders.md)

#### Defined in

[src/listener.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L37)

___

### db\_mempool

• **db\_mempool**: [`DbMempool`](DbMempool.md)

#### Defined in

[src/listener.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L35)

___

### db\_plugin

• **db\_plugin**: [`DbPlugin`](DbPlugin.md)

#### Defined in

[src/listener.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L38)

___

### disableInterval

• **disableInterval**: `undefined` \| `boolean`

#### Defined in

[src/listener.ts:30](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L30)

___

### headers

• **headers**: `default`

#### Defined in

[src/listener.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L39)

___

### host

• **host**: `string`

#### Defined in

[src/listener.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L32)

___

### interval

• `Optional` **interval**: `Timer`

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

#### Defined in

[src/listener.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L31)

___

### name

• **name**: `string`

#### Defined in

[src/listener.ts:28](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L28)

___

### port

• **port**: `number`

#### Defined in

[src/listener.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L33)

___

### promiseSyncBlock

• `Optional` **promiseSyncBlock**: `Promise`<{ `blockSize`: `number` ; `processed`: `number` ; `skipped`: `number`  }\>

#### Defined in

[src/listener.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L45)

___

### reconnectTime

• **reconnectTime**: `number`

#### Defined in

[src/listener.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L34)

___

### reconnectTimeout

• `Optional` **reconnectTimeout**: `Timeout`

#### Defined in

[src/listener.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L40)

___

### ticker

• **ticker**: `string`

#### Defined in

[src/listener.ts:27](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L27)

___

### txsSeen

• **txsSeen**: `number`

#### Defined in

[src/listener.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L43)

___

### txsSize

• **txsSize**: `number`

#### Defined in

[src/listener.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L44)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](Spv.md#capturerejectionsymbol)

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:291

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:296

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

EventEmitter.defaultMaxListeners

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

EventEmitter.errorMonitor

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:290

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`Listener`](Listener.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.addListener

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

#### Defined in

[src/listener.ts:179](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L179)

___

### disconnect

▸ **disconnect**(): `void`

#### Returns

`void`

#### Defined in

[src/listener.ts:121](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L121)

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

EventEmitter.emit

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

EventEmitter.eventNames

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

#### Defined in

[src/listener.ts:355](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L355)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](Listener.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

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

#### Defined in

[src/listener.ts:373](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L373)

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

EventEmitter.listenerCount

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

EventEmitter.listeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:502

___

### off

▸ **off**(`eventName`, `listener`): [`Listener`](Listener.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:462

___

### on

▸ **on**(`eventName`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.on

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

#### Defined in

[src/listener.ts:142](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L142)

___

### once

▸ **once**(`eventName`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:377

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:597

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.prependOnceListener

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

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:532

___

### readBlock

▸ **readBlock**(`__namedParameters`, `callback`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.hash` | `string` |
| `__namedParameters.height` | `number` |
| `callback` | (`params`: `any`) => `Promise`<`void`\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/listener.ts:360](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L360)

___

### reconnect

▸ **reconnect**(): `void`

#### Returns

`void`

#### Defined in

[src/listener.ts:114](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L114)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:473

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:457

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Listener`](Listener.md)

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

[`Listener`](Listener.md)

#### Inherited from

EventEmitter.setMaxListeners

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

#### Defined in

[src/listener.ts:254](https://github.com/kevinejohn/bsv-spv/blob/master/src/listener.ts#L254)

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

EventEmitter.getEventListeners

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

EventEmitter.listenerCount

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

EventEmitter.on

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

EventEmitter.once

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

EventEmitter.once

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

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:280
