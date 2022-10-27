[bsv-spv](../README.md) / DbNodes

# Class: DbNodes

## Table of contents

### Constructors

- [constructor](DbNodes.md#constructor)

### Properties

- [blacklistTime](DbNodes.md#blacklisttime)
- [dbi\_blacklisted](DbNodes.md#dbi_blacklisted)
- [dbi\_connected](DbNodes.md#dbi_connected)
- [dbi\_meta](DbNodes.md#dbi_meta)
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
- [hasConnected](DbNodes.md#hasconnected)
- [hasSavedSeen](DbNodes.md#hassavedseen)
- [isBlacklisted](DbNodes.md#isblacklisted)
- [markSavedSeen](DbNodes.md#marksavedseen)
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

[src/db_nodes.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L15)

## Properties

### blacklistTime

• **blacklistTime**: `number`

#### Defined in

[src/db_nodes.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L6)

___

### dbi\_blacklisted

• **dbi\_blacklisted**: `Database`<`number`, `string`\>

#### Defined in

[src/db_nodes.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L12)

___

### dbi\_connected

• **dbi\_connected**: `Database`<`number`, `string`\>

#### Defined in

[src/db_nodes.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L11)

___

### dbi\_meta

• **dbi\_meta**: `Database`<`any`, `string`\>

#### Defined in

[src/db_nodes.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L9)

___

### dbi\_root

• **dbi\_root**: `RootDatabase`<`any`, `Key`\>

#### Defined in

[src/db_nodes.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L8)

___

### dbi\_seen

• **dbi\_seen**: `Database`<`any`, `string`\>

#### Defined in

[src/db_nodes.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L10)

___

### env

• **env**: `any`

#### Defined in

[src/db_nodes.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L7)

___

### nodesDir

• **nodesDir**: `string`

#### Defined in

[src/db_nodes.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L13)

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

[src/db_nodes.ts:100](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L100)

___

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_nodes.ts:47](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L47)

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

[src/db_nodes.ts:90](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L90)

___

### getBlacklistedNodes

▸ **getBlacklistedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:112](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L112)

___

### getConnectedNodes

▸ **getConnectedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:123](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L123)

___

### getSeenNodes

▸ **getSeenNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:132](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L132)

___

### hasConnected

▸ **hasConnected**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `string` |

#### Returns

`boolean`

#### Defined in

[src/db_nodes.ts:95](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L95)

___

### hasSavedSeen

▸ **hasSavedSeen**(`secondsAgo?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `secondsAgo` | `number` | `60` |

#### Returns

`boolean`

#### Defined in

[src/db_nodes.ts:80](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L80)

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

[src/db_nodes.ts:107](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L107)

___

### markSavedSeen

▸ **markSavedSeen**(): `void`

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:77](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L77)

___

### saveSeenNodes

▸ **saveSeenNodes**(`addrs`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `addrs` | `NetAddress`[] |

#### Returns

`number`

#### Defined in

[src/db_nodes.ts:65](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L65)
