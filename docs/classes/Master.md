[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / Master

# Class: Master

Defined in: [src/cluster\_master.ts:52](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L52)

## Constructors

### Constructor

> **new Master**(`__namedParameters`): `Master`

Defined in: [src/cluster\_master.ts:73](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L73)

#### Parameters

##### \_\_namedParameters

[`MasterOptions`](../interfaces/MasterOptions.md)

#### Returns

`Master`

## Properties

### block\_nodes

> **block\_nodes**: `Set`\<`string`\>

Defined in: [src/cluster\_master.ts:61](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L61)

***

### blocks

> **blocks**: `number`

Defined in: [src/cluster\_master.ts:65](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L65)

***

### db\_nodes

> **db\_nodes**: [`DbNodes`](DbNodes.md)

Defined in: [src/cluster\_master.ts:57](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L57)

***

### memoryInterval?

> `optional` **memoryInterval?**: `Timeout`

Defined in: [src/cluster\_master.ts:71](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L71)

***

### mempool

> **mempool**: `number`

Defined in: [src/cluster\_master.ts:64](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L64)

***

### mempool\_nodes

> **mempool\_nodes**: `Set`\<`string`\>

Defined in: [src/cluster\_master.ts:62](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L62)

***

### mempool\_sockets

> **mempool\_sockets**: `object`

Defined in: [src/cluster\_master.ts:54](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L54)

#### Index Signature

\[`key`: `string`\]: `Socket`

***

### nodeBackoffBase

> **nodeBackoffBase**: `number`

Defined in: [src/cluster\_master.ts:67](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L67)

***

### nodeBackoffMax

> **nodeBackoffMax**: `number`

Defined in: [src/cluster\_master.ts:68](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L68)

***

### nodeStableTime

> **nodeStableTime**: `number`

Defined in: [src/cluster\_master.ts:69](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L69)

***

### queue\_block\_nodes

> **queue\_block\_nodes**: `string`[]

Defined in: [src/cluster\_master.ts:59](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L59)

***

### queue\_mempool\_nodes

> **queue\_mempool\_nodes**: `string`[]

Defined in: [src/cluster\_master.ts:60](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L60)

***

### seed\_nodes

> **seed\_nodes**: `string`[]

Defined in: [src/cluster\_master.ts:63](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L63)

***

### seedNodesOnly

> **seedNodesOnly**: `boolean`

Defined in: [src/cluster\_master.ts:66](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L66)

***

### server?

> `optional` **server?**: `Server`

Defined in: [src/cluster\_master.ts:56](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L56)

***

### shuttingDown

> **shuttingDown**: `boolean`

Defined in: [src/cluster\_master.ts:70](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L70)

***

### sockets

> **sockets**: `object`

Defined in: [src/cluster\_master.ts:53](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L53)

#### Index Signature

\[`key`: `string`\]: `Socket`

***

### workerConfig

> **workerConfig**: [`SpvOptions`](../interfaces/SpvOptions.md)

Defined in: [src/cluster\_master.ts:58](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L58)

***

### workers

> **workers**: `object`

Defined in: [src/cluster\_master.ts:55](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L55)

#### Index Signature

\[`key`: `string`\]: `Worker`

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/cluster\_master.ts:521](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L521)

#### Returns

`Promise`\<`void`\>

***

### getAllNodes()

> **getAllNodes**(): `string`[]

Defined in: [src/cluster\_master.ts:448](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L448)

Every known node, regardless of cooldown state.

#### Returns

`string`[]

***

### getNextNode()

> **getNextNode**(`type`): `object`

Defined in: [src/cluster\_master.ts:483](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L483)

Pick the next node for a worker.

Returns the node plus how long the worker should wait before dialling it.
`waitMs` is only non-zero when every known host is still cooling down
after a failed attempt, in which case the shortest outstanding cooldown
wins rather than spinning on a host that is known to be down.

#### Parameters

##### type

[`WorkerType`](../type-aliases/WorkerType.md)

#### Returns

`object`

##### node

> **node**: `string`

##### waitMs

> **waitMs**: `number`

***

### getNodes()

> **getNodes**(): `string`[]

Defined in: [src/cluster\_master.ts:414](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L414)

#### Returns

`string`[]

***

### onMempoolTxMessage()

> **onMempoolTxMessage**(`data`): `void`

Defined in: [src/cluster\_master.ts:403](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L403)

#### Parameters

##### data

`any`

#### Returns

`void`

***

### onMessage()

> **onMessage**(`data`): `void`

Defined in: [src/cluster\_master.ts:391](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L391)

#### Parameters

##### data

`any`

#### Returns

`void`

***

### startServer()

> **startServer**(`__namedParameters`): `void`

Defined in: [src/cluster\_master.ts:310](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L310)

#### Parameters

##### \_\_namedParameters

###### host?

`string` = `"localhost"`

###### port

`number` = `8080`

#### Returns

`void`
