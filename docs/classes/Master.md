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

• **new Master**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`MasterOptions`](../interfaces/MasterOptions.md) |

#### Defined in

[src/cluster_master.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L51)

## Properties

### block\_nodes

• **block\_nodes**: `Set`<`string`\>

#### Defined in

[src/cluster_master.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L44)

___

### blocks

• **blocks**: `number`

#### Defined in

[src/cluster_master.ts:48](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L48)

___

### db\_nodes

• **db\_nodes**: [`DbNodes`](DbNodes.md)

#### Defined in

[src/cluster_master.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L41)

___

### mempool

• **mempool**: `number`

#### Defined in

[src/cluster_master.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L47)

___

### mempool\_nodes

• **mempool\_nodes**: `Set`<`string`\>

#### Defined in

[src/cluster_master.ts:45](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L45)

___

### mempool\_sockets

• **mempool\_sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L38)

___

### queue\_block\_nodes

• **queue\_block\_nodes**: `string`[]

#### Defined in

[src/cluster_master.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L42)

___

### queue\_mempool\_nodes

• **queue\_mempool\_nodes**: `string`[]

#### Defined in

[src/cluster_master.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L43)

___

### seedNodesOnly

• **seedNodesOnly**: `boolean`

#### Defined in

[src/cluster_master.ts:49](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L49)

___

### seed\_nodes

• **seed\_nodes**: `string`[]

#### Defined in

[src/cluster_master.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L46)

___

### server

• `Optional` **server**: `Server`

#### Defined in

[src/cluster_master.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L40)

___

### sockets

• **sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L37)

___

### workers

• **workers**: `Object`

#### Index signature

▪ [key: `string`]: `Worker`

#### Defined in

[src/cluster_master.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L39)

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

[src/cluster_master.ts:339](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L339)

___

### getNodes

▸ **getNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/cluster_master.ts:308](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L308)

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

[src/cluster_master.ts:297](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L297)

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

[src/cluster_master.ts:285](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L285)

___

### startServer

▸ **startServer**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.host?` | `string` |
| `__namedParameters.port` | `number` |

#### Returns

`void`

#### Defined in

[src/cluster_master.ts:204](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L204)
