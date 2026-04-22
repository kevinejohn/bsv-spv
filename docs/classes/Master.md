[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / Master

# Class: Master

Defined in: [src/cluster\_master.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L46)

## Constructors

### Constructor

> **new Master**(`__namedParameters`): `Master`

Defined in: [src/cluster\_master.ts:64](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L64)

#### Parameters

##### \_\_namedParameters

[`MasterOptions`](../interfaces/MasterOptions.md)

#### Returns

`Master`

## Properties

### block\_nodes

> **block\_nodes**: `Set`\<`string`\>

Defined in: [src/cluster\_master.ts:55](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L55)

***

### blocks

> **blocks**: `number`

Defined in: [src/cluster\_master.ts:59](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L59)

***

### db\_nodes

> **db\_nodes**: [`DbNodes`](DbNodes.md)

Defined in: [src/cluster\_master.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L51)

***

### memoryInterval?

> `optional` **memoryInterval?**: `Timeout`

Defined in: [src/cluster\_master.ts:62](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L62)

***

### mempool

> **mempool**: `number`

Defined in: [src/cluster\_master.ts:58](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L58)

***

### mempool\_nodes

> **mempool\_nodes**: `Set`\<`string`\>

Defined in: [src/cluster\_master.ts:56](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L56)

***

### mempool\_sockets

> **mempool\_sockets**: `object`

Defined in: [src/cluster\_master.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L48)

#### Index Signature

\[`key`: `string`\]: `Socket`

***

### queue\_block\_nodes

> **queue\_block\_nodes**: `string`[]

Defined in: [src/cluster\_master.ts:53](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L53)

***

### queue\_mempool\_nodes

> **queue\_mempool\_nodes**: `string`[]

Defined in: [src/cluster\_master.ts:54](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L54)

***

### seed\_nodes

> **seed\_nodes**: `string`[]

Defined in: [src/cluster\_master.ts:57](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L57)

***

### seedNodesOnly

> **seedNodesOnly**: `boolean`

Defined in: [src/cluster\_master.ts:60](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L60)

***

### server?

> `optional` **server?**: `Server`

Defined in: [src/cluster\_master.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L50)

***

### shuttingDown

> **shuttingDown**: `boolean`

Defined in: [src/cluster\_master.ts:61](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L61)

***

### sockets

> **sockets**: `object`

Defined in: [src/cluster\_master.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L47)

#### Index Signature

\[`key`: `string`\]: `Socket`

***

### workerConfig

> **workerConfig**: [`SpvOptions`](../interfaces/SpvOptions.md)

Defined in: [src/cluster\_master.ts:52](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L52)

***

### workers

> **workers**: `object`

Defined in: [src/cluster\_master.ts:49](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L49)

#### Index Signature

\[`key`: `string`\]: `Worker`

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/cluster\_master.ts:411](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L411)

#### Returns

`Promise`\<`void`\>

***

### getNextNode()

> **getNextNode**(`type`): `string`

Defined in: [src/cluster\_master.ts:378](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L378)

#### Parameters

##### type

`"block"` \| `"mempool"`

#### Returns

`string`

***

### getNodes()

> **getNodes**(): `string`[]

Defined in: [src/cluster\_master.ts:347](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L347)

#### Returns

`string`[]

***

### onMempoolTxMessage()

> **onMempoolTxMessage**(`data`): `void`

Defined in: [src/cluster\_master.ts:336](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L336)

#### Parameters

##### data

`any`

#### Returns

`void`

***

### onMessage()

> **onMessage**(`data`): `void`

Defined in: [src/cluster\_master.ts:324](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L324)

#### Parameters

##### data

`any`

#### Returns

`void`

***

### startServer()

> **startServer**(`__namedParameters`): `void`

Defined in: [src/cluster\_master.ts:243](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L243)

#### Parameters

##### \_\_namedParameters

###### host?

`string` = `"localhost"`

###### port

`number` = `8080`

#### Returns

`void`
