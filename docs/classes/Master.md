[bsv-spv](../README.md) / Master

# Class: Master

## Table of contents

### Constructors

- [constructor](Master.md#constructor)

### Properties

- [server](Master.md#server)
- [sockets](Master.md#sockets)
- [workers](Master.md#workers)

### Methods

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

[src/cluster_master.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L35)

## Properties

### server

• `Optional` **server**: `Server`

#### Defined in

[src/cluster_master.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L33)

___

### sockets

• **sockets**: `Object`

#### Index signature

▪ [key: `string`]: `Net.Socket`

#### Defined in

[src/cluster_master.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L31)

___

### workers

• **workers**: `Object`

#### Index signature

▪ [key: `string`]: `Worker`

#### Defined in

[src/cluster_master.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L32)

## Methods

### onMessage

▸ **onMessage**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[src/cluster_master.ts:165](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L165)

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

[src/cluster_master.ts:116](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_master.ts#L116)
