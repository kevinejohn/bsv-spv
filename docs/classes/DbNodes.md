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

• **dbi\_blacklisted**: `any`

#### Defined in

[src/db_nodes.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L10)

___

### dbi\_connected

• **dbi\_connected**: `any`

#### Defined in

[src/db_nodes.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L9)

___

### dbi\_seen

• **dbi\_seen**: `any`

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

[src/db_nodes.ts:96](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L96)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L50)

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

[src/db_nodes.ts:88](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L88)

___

### getBlacklistedNodes

▸ **getBlacklistedNodes**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/db_nodes.ts:118](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L118)

___

### getConnectedNodes

▸ **getConnectedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:150](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L150)

___

### getSeenNodes

▸ **getSeenNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:166](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L166)

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

[src/db_nodes.ts:103](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L103)

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

[src/db_nodes.ts:65](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L65)
