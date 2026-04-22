[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / DbHeaders

# Class: DbHeaders

Defined in: [src/db\_headers.ts:6](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L6)

## Constructors

### Constructor

> **new DbHeaders**(`__namedParameters`): `DbHeaders`

Defined in: [src/db\_headers.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L13)

#### Parameters

##### \_\_namedParameters

###### headers

`any`

###### headersDir

`string`

###### readOnly?

`boolean` = `true`

#### Returns

`DbHeaders`

## Properties

### dbi\_headers

> **dbi\_headers**: `Database`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [src/db\_headers.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L10)

***

### dbi\_root

> **dbi\_root**: `RootDatabase`

Defined in: [src/db\_headers.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L9)

***

### env

> **env**: `any`

Defined in: [src/db\_headers.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L8)

***

### headers

> **headers**: `Headers`

Defined in: [src/db\_headers.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L7)

***

### headersDir

> **headersDir**: `string`

Defined in: [src/db\_headers.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L11)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [src/db\_headers.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L37)

#### Returns

`Promise`\<`void`\>

***

### getHeader()

> **getHeader**(`hash`): `Header`

Defined in: [src/db\_headers.ts:59](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L59)

#### Parameters

##### hash

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`Header`

***

### loadHeaders()

> **loadHeaders**(): `void`

Defined in: [src/db\_headers.ts:72](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L72)

#### Returns

`void`

***

### saveHeaders()

> **saveHeaders**(`headerArray`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>

Defined in: [src/db\_headers.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L46)

#### Parameters

##### headerArray

`Header`[]

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>[]\>
