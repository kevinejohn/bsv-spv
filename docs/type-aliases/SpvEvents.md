[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / SpvEvents

# Type Alias: SpvEvents

> **SpvEvents** = `object`

Defined in: [src/types/SpvEmitter.ts:5](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L5)

## Properties

### block\_already\_saved

> **block\_already\_saved**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L51)

#### Parameters

##### data

###### hash

`string`

###### height?

`number`

###### size

`number`

###### startDate

`number`

###### txCount

`number`

#### Returns

`void`

***

### block\_chunk

> **block\_chunk**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:33](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L33)

#### Parameters

##### data

###### blockHash

`Buffer`

###### chunk

`Buffer`

###### finished?

`boolean`

###### header

`Header`

###### height?

`number`

###### size

`number`

###### startDate

`number`

###### started?

`boolean`

###### txCount

`number`

#### Returns

`void`

***

### block\_downloading

> **block\_downloading**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L72)

#### Parameters

##### data

###### hash

`string`

###### height

`number`

#### Returns

`void`

***

### block\_pruned

> **block\_pruned**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:73](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L73)

#### Parameters

##### data

###### hash

`string`

###### height?

`number`

#### Returns

`void`

***

### block\_reorg

> **block\_reorg**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L7)

#### Parameters

##### data

###### hash

`string`

###### height

`number`

#### Returns

`void`

***

### block\_saved

> **block\_saved**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:44](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L44)

#### Parameters

##### data

###### hash

`string`

###### height?

`number`

###### size

`number`

###### startDate

`number`

###### txCount

`number`

#### Returns

`void`

***

### block\_seen

> **block\_seen**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:32](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L32)

#### Parameters

##### data

###### hashes

`Buffer`[]

#### Returns

`void`

***

### block\_txs

> **block\_txs**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:59](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L59)

#### Parameters

##### data

###### finished?

`boolean`

###### header

`Header`

###### height?

`number`

###### size?

`number`

###### startDate?

`number`

###### started?

`boolean`

###### txCount?

`number`

###### txs

`TxIndex`[]

#### Returns

`void`

***

### connected

> **connected**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:23](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L23)

#### Parameters

##### data

###### node

`string`

###### port

`number`

###### ticker

`string`

#### Returns

`void`

***

### could\_not\_connect

> **could\_not\_connect**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:71](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L71)

#### Parameters

##### data

###### node

`string`

###### ticker

`string`

#### Returns

`void`

***

### disconnected

> **disconnected**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L9)

#### Parameters

##### data

###### disconnects

`number`

###### node

`string`

###### ticker

`string`

#### Returns

`void`

***

### headers\_new

> **headers\_new**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L8)

#### Parameters

##### data

###### headers

`Header`[]

#### Returns

`void`

***

### headers\_saved

> **headers\_saved**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L6)

#### Parameters

##### data

###### hashes

`Buffer`[]

#### Returns

`void`

***

### mempool\_tx

> **mempool\_tx**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:69](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L69)

#### Parameters

##### data

###### transaction

`Transaction`

#### Returns

`void`

***

### mempool\_txs\_seen

> **mempool\_txs\_seen**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:70](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L70)

#### Parameters

##### data

###### txids

`Buffer`[]

#### Returns

`void`

***

### peer\_error

> **peer\_error**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:14](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L14)

#### Parameters

##### data

###### buffer

`Buffer`

###### error

`Error`

###### extmsg

`boolean`

###### magic

`Buffer`

###### node

`string`

###### port

`number`

###### ticker

`string`

#### Returns

`void`

***

### pruned\_block

> **pruned\_block**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:58](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L58)

#### Parameters

##### data

###### hash

`string`

###### height

`number`

#### Returns

`void`

***

### version

> **version**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:31](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L31)

#### Parameters

##### data

###### node

`string`

###### version

`VersionOptions`

#### Returns

`void`

***

### version\_invalid

> **version\_invalid**: (`data`) => `void`

Defined in: [src/types/SpvEmitter.ts:24](https://github.com/kevinejohn/bsv-spv/blob/master/src/types/SpvEmitter.ts#L24)

#### Parameters

##### data

###### error

`string`

###### expected_user_agent?

`string`

###### node

`string`

###### user_agent?

`string`

###### version

`VersionOptions`

#### Returns

`void`
