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
- [enableIpv6](DbNodes.md#enableipv6)
- [env](DbNodes.md#env)
- [nodesDir](DbNodes.md#nodesdir)

### Methods

- [blacklist](DbNodes.md#blacklist)
- [close](DbNodes.md#close)
- [connected](DbNodes.md#connected)
- [formatUrl](DbNodes.md#formaturl)
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
| `__namedParameters.enableIpv6?` | `boolean` |
| `__namedParameters.nodesDir` | `string` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_nodes.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L16)

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

### enableIpv6

• **enableIpv6**: `boolean`

#### Defined in

[src/db_nodes.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L14)

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

▸ **blacklist**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.node` | `string` |
| `__namedParameters.port?` | `number` |

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:126](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L126)

___

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_nodes.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L51)

___

### connected

▸ **connected**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.node` | `string` |
| `__namedParameters.port?` | `number` |

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:114](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L114)

___

### formatUrl

▸ **formatUrl**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.node` | `string` |
| `__namedParameters.port?` | `number` |

#### Returns

`string`

#### Defined in

[src/db_nodes.ts:69](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L69)

___

### getBlacklistedNodes

▸ **getBlacklistedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:140](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L140)

___

### getConnectedNodes

▸ **getConnectedNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:151](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L151)

___

### getSeenNodes

▸ **getSeenNodes**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/db_nodes.ts:160](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L160)

___

### hasConnected

▸ **hasConnected**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.node` | `string` |
| `__namedParameters.port?` | `number` |

#### Returns

`boolean`

#### Defined in

[src/db_nodes.ts:120](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L120)

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

[src/db_nodes.ts:104](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L104)

___

### isBlacklisted

▸ **isBlacklisted**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.node` | `string` |
| `__namedParameters.port?` | `number` |

#### Returns

`boolean`

#### Defined in

[src/db_nodes.ts:134](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L134)

___

### markSavedSeen

▸ **markSavedSeen**(): `void`

#### Returns

`void`

#### Defined in

[src/db_nodes.ts:101](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L101)

___

### saveSeenNodes

▸ **saveSeenNodes**(`addrs`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addrs` | `string`[] \| `NetAddress`[] |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/db_nodes.ts:82](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L82)
