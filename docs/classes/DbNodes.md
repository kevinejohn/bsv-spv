[bsv-spv](../README.md) / DbNodes

# Class: DbNodes

## Table of contents

### Constructors

- [constructor](DbNodes.md#constructor)

### Properties

- [blacklistTime](DbNodes.md#blacklisttime)
- [dbi\_blacklisted](DbNodes.md#dbi_blacklisted)
- [dbi\_connected](DbNodes.md#dbi_connected)
- [dbi\_root](DbNodes.md#dbi_root)
- [dbi\_seen](DbNodes.md#dbi_seen)
- [env](DbNodes.md#env)
- [nodesDir](DbNodes.md#nodesdir)

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

[src/db_nodes.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L13)

## Properties

### blacklistTime

• **blacklistTime**: `number`

#### Defined in

[src/db_nodes.ts:5](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L5)

___

### dbi\_blacklisted

• **dbi\_blacklisted**: `Database`<`number`, `Key`\>

#### Defined in

[src/db_nodes.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L10)

___

### dbi\_connected

• **dbi\_connected**: `Database`<`number`, `Key`\>

#### Defined in

[src/db_nodes.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L9)

___

### dbi\_root

• **dbi\_root**: `RootDatabase`<`any`, `Key`\>

#### Defined in

[src/db_nodes.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L7)

___

### dbi\_seen

• **dbi\_seen**: `Database`<`number`, `Key`\>

#### Defined in

[src/db_nodes.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L8)

___

### env

• **env**: `any`

#### Defined in

[src/db_nodes.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L6)

___

### nodesDir

• **nodesDir**: `string`

#### Defined in

[src/db_nodes.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L11)

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

[src/db_nodes.ts:77](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L77)

___

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_nodes.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L42)

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

[src/db_nodes.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L72)

___

### getBlacklistedNodes

▸ **getBlacklistedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:87](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L87)

___

### getConnectedNodes

▸ **getConnectedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:98](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L98)

___

### getSeenNodes

▸ **getSeenNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:107](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L107)

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

[src/db_nodes.ts:82](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L82)

___

### saveSeenNodes

▸ **saveSeenNodes**(`addrArray`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `addrArray` | `any`[] |

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:57](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L57)
