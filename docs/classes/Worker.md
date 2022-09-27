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

[src/cluster_worker.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L16)

## Properties

### spv

• `Optional` **spv**: [`Spv`](Spv.md)

#### Defined in

[src/cluster_worker.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L14)

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

[src/cluster_worker.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L33)

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

[src/cluster_worker.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/cluster_worker.ts#L37)
