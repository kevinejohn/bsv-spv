[bsv-spv](../README.md) / DbHeaders

# Class: DbHeaders

## Table of contents

### Constructors

- [constructor](DbHeaders.md#constructor)

### Properties

- [dbi\_headers](DbHeaders.md#dbi_headers)
- [env](DbHeaders.md#env)
- [headers](DbHeaders.md#headers)

### Methods

- [close](DbHeaders.md#close)
- [getHeader](DbHeaders.md#getheader)
- [loadHeaders](DbHeaders.md#loadheaders)
- [saveHeaders](DbHeaders.md#saveheaders)

## Constructors

### constructor

• **new DbHeaders**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.headers` | `any` |
| `__namedParameters.headersDir` | `string` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_headers.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L11)

## Properties

### dbi\_headers

• **dbi\_headers**: `any`

#### Defined in

[src/db_headers.ts:9](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L9)

___

### env

• **env**: `any`

#### Defined in

[src/db_headers.ts:8](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L8)

___

### headers

• **headers**: `default`

#### Defined in

[src/db_headers.ts:7](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L7)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_headers.ts:42](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L42)

___

### getHeader

▸ **getHeader**(`hash`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` \| `Buffer` |

#### Returns

`default`

#### Defined in

[src/db_headers.ts:92](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L92)

___

### loadHeaders

▸ **loadHeaders**(): `void`

#### Returns

`void`

#### Defined in

[src/db_headers.ts:105](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L105)

___

### saveHeaders

▸ **saveHeaders**(`headerArray`): `Promise`<`Buffer`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `headerArray` | `default`[] |

#### Returns

`Promise`<`Buffer`[]\>

#### Defined in

[src/db_headers.ts:51](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L51)
