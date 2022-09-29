[bsv-spv](../README.md) / DbHeaders

# Class: DbHeaders

## Table of contents

### Constructors

- [constructor](DbHeaders.md#constructor)

### Properties

- [dbIsOpen](DbHeaders.md#dbisopen)
- [dbi\_headers](DbHeaders.md#dbi_headers)
- [env](DbHeaders.md#env)
- [headers](DbHeaders.md#headers)
- [headersDir](DbHeaders.md#headersdir)
- [keepOpen](DbHeaders.md#keepopen)
- [readOnly](DbHeaders.md#readonly)

### Methods

- [close](DbHeaders.md#close)
- [getHeader](DbHeaders.md#getheader)
- [loadHeaders](DbHeaders.md#loadheaders)
- [open](DbHeaders.md#open)
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
| `__namedParameters.keepOpen?` | `boolean` |
| `__namedParameters.readOnly?` | `boolean` |

#### Defined in

[src/db_headers.ts:15](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L15)

## Properties

### dbIsOpen

• **dbIsOpen**: `boolean`

#### Defined in

[src/db_headers.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L13)

___

### dbi\_headers

• **dbi\_headers**: `Dbi`

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

___

### headersDir

• **headersDir**: `string`

#### Defined in

[src/db_headers.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L10)

___

### keepOpen

• **keepOpen**: `boolean`

#### Defined in

[src/db_headers.ts:12](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L12)

___

### readOnly

• **readOnly**: `boolean`

#### Defined in

[src/db_headers.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L11)

## Methods

### close

▸ **close**(): `void`

#### Returns

`void`

#### Defined in

[src/db_headers.ts:67](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L67)

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

[src/db_headers.ts:112](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L112)

___

### loadHeaders

▸ **loadHeaders**(): `void`

#### Returns

`void`

#### Defined in

[src/db_headers.ts:127](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L127)

___

### open

▸ **open**(): `void`

#### Returns

`void`

#### Defined in

[src/db_headers.ts:50](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L50)

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

[src/db_headers.ts:78](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L78)
