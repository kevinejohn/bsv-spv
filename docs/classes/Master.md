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

[src/cluster_master.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L39)

## Properties

### mempool\_sockets

• **mempool\_sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L35)

___

### server

• `Optional` **server**: `Server`

#### Defined in

[src/cluster_master.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L37)

___

### sockets

• **sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L34)

___

### workers

• **workers**: `Object`

#### Index signature

▪ [key: `string`]: `Worker`

#### Defined in

[src/cluster_master.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L36)

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

[src/cluster_master.ts:247](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L247)

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

[src/cluster_master.ts:236](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L236)

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

[src/cluster_master.ts:164](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L164)
