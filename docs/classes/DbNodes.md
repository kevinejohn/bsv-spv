[bsv-spv](../README.md) / DbNodes

# Class: DbNodes

## Table of contents

### Constructors

- [constructor](DbNodes.md#constructor)

### Properties

- [blacklistTime](DbNodes.md#blacklisttime)
- [dbi\_blacklisted](DbNodes.md#dbi_blacklisted)
- [dbi\_connected](DbNodes.md#dbi_connected)
- [dbi\_seen](DbNodes.md#dbi_seen)
- [env](DbNodes.md#env)

### Methods

- [blacklist](DbNodes.md#blacklist)
- [close](DbNodes.md#close)
- [connected](DbNodes.md#connected)
- [getBlacklistedNodes](DbNodes.md#getblacklistednodes)
- [getConnectedNodes](DbNodes.md#getconnectednodes)
- [getSeenNodes](DbNodes.md#getseennodes)
- [isBlacklisted](DbNodes.md#isblacklisted)
- [saveSeenNodes](DbNodes.md#saveseennodes)

## Constructors

### constructor

• **new DbNodes**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.blacklistTime?` | `number` |
| `__namedParameters.nodesDir` | `string` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_nodes.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L12)

## Properties

### blacklistTime

• **blacklistTime**: `number`

#### Defined in

[src/db_nodes.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L6)

___

### dbi\_blacklisted

• **dbi\_blacklisted**: `Dbi`

#### Defined in

[src/db_nodes.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L10)

___

### dbi\_connected

• **dbi\_connected**: `Dbi`

#### Defined in

[src/db_nodes.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L9)

___

### dbi\_seen

• **dbi\_seen**: `Dbi`

#### Defined in

[src/db_nodes.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L8)

___

### env

• **env**: `any`

#### Defined in

[src/db_nodes.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L7)

## Methods

### blacklist

▸ **blacklist**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` |

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:99](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L99)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:49](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L49)

___

### connected

▸ **connected**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` |

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:91](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L91)

___

### getBlacklistedNodes

▸ **getBlacklistedNodes**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/db_nodes.ts:123](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L123)

___

### getConnectedNodes

▸ **getConnectedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:165](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L165)

___

### getSeenNodes

▸ **getSeenNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:183](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L183)

___

### isBlacklisted

▸ **isBlacklisted**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` |

#### Returns

`boolean`

#### Defined in

[src/db_nodes.ts:106](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L106)

___

### saveSeenNodes

▸ **saveSeenNodes**(`addrArray`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addrArray` | `any`[] |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/db_nodes.ts:64](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L64)
