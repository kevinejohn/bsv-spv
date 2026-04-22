[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / Worker

# Class: Worker

Defined in: [src/cluster\_worker.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L12)

## Constructors

### Constructor

> **new Worker**(): `Worker`

Defined in: [src/cluster\_worker.ts:20](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L20)

#### Returns

`Worker`

## Properties

### blockInterval?

> `optional` **blockInterval?**: `Timeout`

Defined in: [src/cluster\_worker.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L15)

***

### memoryInterval?

> `optional` **memoryInterval?**: `Timeout`

Defined in: [src/cluster\_worker.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L16)

***

### resetInterval?

> `optional` **resetInterval?**: `Timeout`

Defined in: [src/cluster\_worker.ts:17](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L17)

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

Defined in: [src/cluster\_worker.ts:18](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L18)

## Methods

### sendToMaster()

> **sendToMaster**(`obj`): `void`

Defined in: [src/cluster\_worker.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L46)

#### Parameters

##### obj

`any`

#### Returns

`void`

***

### shutdown()

> **shutdown**(`exitCode?`, `reason?`): `Promise`\<`void`\>

Defined in: [src/cluster\_worker.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L50)

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

Defined in: [src/cluster\_worker.ts:68](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L68)

#### Parameters

##### config

[`SpvOptions`](../interfaces/SpvOptions.md)

#### Returns

`Promise`\<`void`\>
