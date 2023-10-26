[bsv-spv](../README.md) / Worker

# Class: Worker

## Table of contents

### Constructors

- [constructor](Worker.md#constructor)

### Properties

- [spv](Worker.md#spv)

### Methods

- [sendToMaster](Worker.md#sendtomaster)
- [start](Worker.md#start)

## Constructors

### constructor

• **new Worker**()

#### Defined in

[src/cluster_worker.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L15)

## Properties

### spv

• `Optional` **spv**: [`Spv`](Spv.md)

#### Defined in

[src/cluster_worker.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L13)

## Methods

### sendToMaster

▸ **sendToMaster**(`obj`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`void`

#### Defined in

[src/cluster_worker.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L36)

___

### start

▸ **start**(`config`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SpvOptions`](../interfaces/SpvOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/cluster_worker.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L40)
