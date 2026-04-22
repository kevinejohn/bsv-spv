[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / DbNodes

# Class: DbNodes

Defined in: [src/db\_nodes.ts:5](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L5)

## Constructors

### Constructor

> **new DbNodes**(`__namedParameters`): `DbNodes`

Defined in: [src/db\_nodes.ts:16](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L16)

#### Parameters

##### \_\_namedParameters

###### blacklistTime?

`number` = `...`

###### enableIpv6?

`boolean` = `false`

###### nodesDir

`string`

###### readOnly?

`boolean` = `true`

#### Returns

`DbNodes`

## Properties

### blacklistTime

> **blacklistTime**: `number`

Defined in: [src/db\_nodes.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L6)

***

### dbi\_blacklisted

> **dbi\_blacklisted**: `Database`\<`number`, `string`\>

Defined in: [src/db\_nodes.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L12)

***

### dbi\_connected

> **dbi\_connected**: `Database`\<`number`, `string`\>

Defined in: [src/db\_nodes.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L11)

***

### dbi\_meta

> **dbi\_meta**: `Database`\<`any`, `string`\>

Defined in: [src/db\_nodes.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L9)

***

### dbi\_root

> **dbi\_root**: `RootDatabase`

Defined in: [src/db\_nodes.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L8)

***

### dbi\_seen

> **dbi\_seen**: `Database`\<`any`, `string`\>

Defined in: [src/db\_nodes.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L10)

***

### enableIpv6

> **enableIpv6**: `boolean`

Defined in: [src/db\_nodes.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L14)

***

### env

> **env**: `any`

Defined in: [src/db\_nodes.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L7)

***

### nodesDir

> **nodesDir**: `string`

Defined in: [src/db\_nodes.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L13)

## Methods

### blacklist()

> **blacklist**(`__namedParameters`): `void`

Defined in: [src/db\_nodes.ts:126](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L126)

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

`void`

***

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/db\_nodes.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L51)

#### Returns

`Promise`\<`void`\>

***

### connected()

> **connected**(`__namedParameters`): `void`

Defined in: [src/db\_nodes.ts:114](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L114)

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

`void`

***

### formatUrl()

> **formatUrl**(`__namedParameters`): `string`

Defined in: [src/db\_nodes.ts:69](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L69)

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

`string`

***

### getBlacklistCutoff()

> **getBlacklistCutoff**(): `number`

Defined in: [src/db\_nodes.ts:152](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L152)

#### Returns

`number`

***

### getBlacklistedNodes()

> **getBlacklistedNodes**(): `string`[]

Defined in: [src/db\_nodes.ts:140](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L140)

#### Returns

`string`[]

***

### getConnectedNodes()

> **getConnectedNodes**(): `string`[]

Defined in: [src/db\_nodes.ts:156](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L156)

#### Returns

`string`[]

***

### getSeenNodes()

> **getSeenNodes**(): `string`[]

Defined in: [src/db\_nodes.ts:165](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L165)

#### Returns

`string`[]

***

### hasConnected()

> **hasConnected**(`__namedParameters`): `boolean`

Defined in: [src/db\_nodes.ts:120](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L120)

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

`boolean`

***

### hasSavedSeen()

> **hasSavedSeen**(`secondsAgo?`): `boolean`

Defined in: [src/db\_nodes.ts:104](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L104)

#### Parameters

##### secondsAgo?

`number` = `60`

#### Returns

`boolean`

***

### isBlacklisted()

> **isBlacklisted**(`__namedParameters`): `boolean`

Defined in: [src/db\_nodes.ts:134](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L134)

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

`boolean`

***

### markSavedSeen()

> **markSavedSeen**(): `void`

Defined in: [src/db\_nodes.ts:101](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L101)

#### Returns

`void`

***

### saveSeenNodes()

> **saveSeenNodes**(`addrs`): `Promise`\<`number`\>

Defined in: [src/db\_nodes.ts:82](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L82)

#### Parameters

##### addrs

`string`[] \| `NetAddress`[]

#### Returns

`Promise`\<`number`\>
