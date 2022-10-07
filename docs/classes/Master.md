[bsv-spv](../README.md) / Master

# Class: Master

## Table of contents

### Constructors

- [constructor](Master.md#constructor)

### Properties

- [mempool\_sockets](Master.md#mempool_sockets)
- [server](Master.md#server)
- [sockets](Master.md#sockets)
- [workers](Master.md#workers)

### Methods

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

[src/cluster_master.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L37)

## Properties

### mempool\_sockets

• **mempool\_sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L33)

___

### server

• `Optional` **server**: `Server`

#### Defined in

[src/cluster_master.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L35)

___

### sockets

• **sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L32)

___

### workers

• **workers**: `Object`

#### Index signature

▪ [key: `string`]: `Worker`

#### Defined in

[src/cluster_master.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L34)

## Methods

### onMempoolTxMessage

▸ **onMempoolTxMessage**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/cluster_master.ts:213](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L213)

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

[src/cluster_master.ts:202](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L202)

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

[src/cluster_master.ts:130](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L130)
