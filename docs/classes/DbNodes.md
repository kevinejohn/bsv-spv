[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / DbNodes

# Class: DbNodes

Defined in: [src/db\_nodes.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L31)

## Constructors

### Constructor

> **new DbNodes**(`__namedParameters`): `DbNodes`

Defined in: [src/db\_nodes.ts:43](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L43)

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

Defined in: [src/db\_nodes.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L32)

***

### dbi\_attempts

> **dbi\_attempts**: `Database`\<[`NodeAttempt`](../interfaces/NodeAttempt.md), `string`\>

Defined in: [src/db\_nodes.ts:39](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L39)

***

### dbi\_blacklisted

> **dbi\_blacklisted**: `Database`\<`number`, `string`\>

Defined in: [src/db\_nodes.ts:38](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L38)

***

### dbi\_connected

> **dbi\_connected**: `Database`\<`number`, `string`\>

Defined in: [src/db\_nodes.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L37)

***

### dbi\_meta

> **dbi\_meta**: `Database`\<`any`, `string`\>

Defined in: [src/db\_nodes.ts:35](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L35)

***

### dbi\_root

> **dbi\_root**: `RootDatabase`

Defined in: [src/db\_nodes.ts:34](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L34)

***

### dbi\_seen

> **dbi\_seen**: `Database`\<`any`, `string`\>

Defined in: [src/db\_nodes.ts:36](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L36)

***

### enableIpv6

> **enableIpv6**: `boolean`

Defined in: [src/db\_nodes.ts:41](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L41)

***

### env

> **env**: `any`

Defined in: [src/db\_nodes.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L33)

***

### nodesDir

> **nodesDir**: `string`

Defined in: [src/db\_nodes.ts:40](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L40)

## Methods

### blacklist()

> **blacklist**(`__namedParameters`): `void`

Defined in: [src/db\_nodes.ts:245](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L245)

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

Defined in: [src/db\_nodes.ts:81](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L81)

#### Returns

`Promise`\<`void`\>

***

### connected()

> **connected**(`__namedParameters`): `void`

Defined in: [src/db\_nodes.ts:147](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L147)

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

Defined in: [src/db\_nodes.ts:102](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L102)

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

`string`

***

### getAttempt()

> **getAttempt**(`__namedParameters`): [`NodeAttempt`](../interfaces/NodeAttempt.md) \| `undefined`

Defined in: [src/db\_nodes.ts:159](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L159)

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

[`NodeAttempt`](../interfaces/NodeAttempt.md) \| `undefined`

***

### getBackoffRemaining()

> **getBackoffRemaining**(`__namedParameters`, `__namedParameters`): `number`

Defined in: [src/db\_nodes.ts:230](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L230)

Milliseconds remaining before this node may be attempted again.
Returns 0 when the node has no failures or its cooldown has elapsed.

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

##### \_\_namedParameters

###### base

`number`

###### max

`number`

###### now?

`number` = `...`

#### Returns

`number`

***

### getBlacklistCutoff()

> **getBlacklistCutoff**(): `number`

Defined in: [src/db\_nodes.ts:271](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L271)

#### Returns

`number`

***

### getBlacklistedNodes()

> **getBlacklistedNodes**(): `string`[]

Defined in: [src/db\_nodes.ts:259](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L259)

#### Returns

`string`[]

***

### getConnectedNodes()

> **getConnectedNodes**(): `string`[]

Defined in: [src/db\_nodes.ts:275](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L275)

#### Returns

`string`[]

***

### getSeenNodes()

> **getSeenNodes**(): `string`[]

Defined in: [src/db\_nodes.ts:284](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L284)

#### Returns

`string`[]

***

### hasConnected()

> **hasConnected**(`__namedParameters`): `boolean`

Defined in: [src/db\_nodes.ts:153](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L153)

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

Defined in: [src/db\_nodes.ts:137](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L137)

#### Parameters

##### secondsAgo?

`number` = `60`

#### Returns

`boolean`

***

### isBlacklisted()

> **isBlacklisted**(`__namedParameters`): `boolean`

Defined in: [src/db\_nodes.ts:253](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L253)

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

Defined in: [src/db\_nodes.ts:134](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L134)

#### Returns

`void`

***

### recordConnected()

> **recordConnected**(`__namedParameters`): `void`

Defined in: [src/db\_nodes.ts:201](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L201)

Record a successful connection. Does not clear the failure counter.

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### now?

`number` = `...`

###### port?

`number`

#### Returns

`void`

***

### recordFailure()

> **recordFailure**(`__namedParameters`, `__namedParameters?`): [`NodeAttempt`](../interfaces/NodeAttempt.md)

Defined in: [src/db\_nodes.ts:179](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L179)

Record the outcome of a connection attempt that failed.

Consecutive failures escalate the backoff. A host that had been connected
for at least `stableTime` is treated as a fresh, one-off failure instead of
a flapping host, so a long-lived peer that finally drops is retried soon.

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

##### \_\_namedParameters?

###### now?

`number` = `...`

###### stableTime?

`number` = `0`

#### Returns

[`NodeAttempt`](../interfaces/NodeAttempt.md)

***

### resetAttempts()

> **resetAttempts**(`__namedParameters`): `void`

Defined in: [src/db\_nodes.ts:219](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L219)

Forget a host's failure streak.

#### Parameters

##### \_\_namedParameters

###### node

`string`

###### port?

`number`

#### Returns

`void`

***

### saveSeenNodes()

> **saveSeenNodes**(`addrs`): `Promise`\<`number`\>

Defined in: [src/db\_nodes.ts:115](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L115)

#### Parameters

##### addrs

`string`[] \| `NetAddress`[]

#### Returns

`Promise`\<`number`\>
