[bsv-spv](../README.md) / Master

# Class: Master

## Table of contents

### Constructors

- [constructor](Master.md#constructor)

### Properties

- [block\_nodes](Master.md#block_nodes)
- [blocks](Master.md#blocks)
- [db\_nodes](Master.md#db_nodes)
- [mempool](Master.md#mempool)
- [mempool\_nodes](Master.md#mempool_nodes)
- [mempool\_sockets](Master.md#mempool_sockets)
- [queue\_block\_nodes](Master.md#queue_block_nodes)
- [queue\_mempool\_nodes](Master.md#queue_mempool_nodes)
- [seedNodesOnly](Master.md#seednodesonly)
- [seed\_nodes](Master.md#seed_nodes)
- [server](Master.md#server)
- [sockets](Master.md#sockets)
- [workers](Master.md#workers)

### Methods

- [getNextNode](Master.md#getnextnode)
- [getNodes](Master.md#getnodes)
- [onMempoolTxMessage](Master.md#onmempooltxmessage)
- [onMessage](Master.md#onmessage)
- [startServer](Master.md#startserver)

## Constructors

### constructor

• **new Master**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`MasterOptions`](../interfaces/MasterOptions.md) |

#### Defined in

[src/cluster_master.ts:53](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L53)

## Properties

### block\_nodes

• **block\_nodes**: `Set`<`string`\>

#### Defined in

[src/cluster_master.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L46)

___

### blocks

• **blocks**: `number`

#### Defined in

[src/cluster_master.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L50)

___

### db\_nodes

• **db\_nodes**: [`DbNodes`](DbNodes.md)

#### Defined in

[src/cluster_master.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L43)

___

### mempool

• **mempool**: `number`

#### Defined in

[src/cluster_master.ts:49](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L49)

___

### mempool\_nodes

• **mempool\_nodes**: `Set`<`string`\>

#### Defined in

[src/cluster_master.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L47)

___

### mempool\_sockets

• **mempool\_sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L40)

___

### queue\_block\_nodes

• **queue\_block\_nodes**: `string`[]

#### Defined in

[src/cluster_master.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L44)

___

### queue\_mempool\_nodes

• **queue\_mempool\_nodes**: `string`[]

#### Defined in

[src/cluster_master.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L45)

___

### seedNodesOnly

• **seedNodesOnly**: `boolean`

#### Defined in

[src/cluster_master.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L51)

___

### seed\_nodes

• **seed\_nodes**: `string`[]

#### Defined in

[src/cluster_master.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L48)

___

### server

• `Optional` **server**: `Server`

#### Defined in

[src/cluster_master.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L42)

___

### sockets

• **sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L39)

___

### workers

• **workers**: `Object`

#### Index signature

▪ [key: `string`]: `Worker`

#### Defined in

[src/cluster_master.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L41)

## Methods

### getNextNode

▸ **getNextNode**(`type`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"block"`` \| ``"mempool"`` |

#### Returns

`string`

#### Defined in

[src/cluster_master.ts:347](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L347)

___

### getNodes

▸ **getNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/cluster_master.ts:316](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L316)

___

### onMempoolTxMessage

▸ **onMempoolTxMessage**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/cluster_master.ts:305](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L305)

___

### onMessage

▸ **onMessage**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/cluster_master.ts:293](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L293)

___

### startServer

▸ **startServer**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `host?` | `string` |
| › `port` | `number` |

#### Returns

`void`

#### Defined in

[src/cluster_master.ts:212](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L212)
