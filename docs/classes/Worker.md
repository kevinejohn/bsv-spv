[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / Worker

# Class: Worker

Defined in: [src/cluster\_worker.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L12)

## Constructors

### Constructor

> **new Worker**(): `Worker`

Defined in: [src/cluster\_worker.ts:22](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L22)

#### Returns

`Worker`

## Properties

### blockInterval?

> `optional` **blockInterval?**: `Timeout`

Defined in: [src/cluster\_worker.ts:17](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L17)

***

### memoryInterval?

> `optional` **memoryInterval?**: `Timeout`

Defined in: [src/cluster\_worker.ts:18](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L18)

***

### pendingNodeTimer?

> `optional` **pendingNodeTimer?**: `Timeout`

Defined in: [src/cluster\_worker.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L16)

***

### requestedNode

> **requestedNode**: `boolean`

Defined in: [src/cluster\_worker.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L15)

***

### resetInterval?

> `optional` **resetInterval?**: `Timeout`

Defined in: [src/cluster\_worker.ts:19](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L19)

***

### shuttingDown

> **shuttingDown**: `boolean`

Defined in: [src/cluster\_worker.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L14)

***

### spv?

> `optional` **spv?**: [`Spv`](Spv.md)

Defined in: [src/cluster\_worker.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L13)

***

### statusInterval?

> `optional` **statusInterval?**: `Timeout`

Defined in: [src/cluster\_worker.ts:20](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L20)

## Methods

### sendToMaster()

> **sendToMaster**(`obj`): `void`

Defined in: [src/cluster\_worker.ts:85](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L85)

#### Parameters

##### obj

`any`

#### Returns

`void`

***

### shutdown()

> **shutdown**(`exitCode?`, `reason?`): `Promise`\<`void`\>

Defined in: [src/cluster\_worker.ts:89](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L89)

#### Parameters

##### exitCode?

`number` = `0`

##### reason?

`string` = `"shutdown"`

#### Returns

`Promise`\<`void`\>

***

### start()

> **start**(`config`): `Promise`\<`void`\>

Defined in: [src/cluster\_worker.ts:109](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L109)

#### Parameters

##### config

[`SpvOptions`](../interfaces/SpvOptions.md) & `object`

#### Returns

`Promise`\<`void`\>
