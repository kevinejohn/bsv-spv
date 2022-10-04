[bsv-spv](../README.md) / DbHeaders

# Class: DbHeaders

## Table of contents

### Constructors

- [constructor](DbHeaders.md#constructor)

### Properties

- [dbi\_headers](DbHeaders.md#dbi_headers)
- [dbi\_root](DbHeaders.md#dbi_root)
- [env](DbHeaders.md#env)
- [headers](DbHeaders.md#headers)
- [headersDir](DbHeaders.md#headersdir)

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

[src/db_headers.ts:13](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L13)

## Properties

### dbi\_headers

• **dbi\_headers**: `Database`<`Buffer`, `Key`\>

#### Defined in

[src/db_headers.ts:10](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L10)

___

### dbi\_root

• **dbi\_root**: `RootDatabase`<`any`, `Key`\>

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

[src/db_headers.ts:11](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L11)

## Methods

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/db_headers.ts:37](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L37)

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

[src/db_headers.ts:56](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L56)

___

### loadHeaders

▸ **loadHeaders**(): `void`

#### Returns

`void`

#### Defined in

[src/db_headers.ts:67](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L67)

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

[src/db_headers.ts:46](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_headers.ts#L46)
