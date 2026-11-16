[**bsv-spv**](../README.md)

***

[bsv-spv](../README.md) / backoffDelay

# Function: backoffDelay()

> **backoffDelay**(`count`, `base`, `max`): `number`

Defined in: [src/db\_nodes.ts:24](https://github.com/kevinejohn/bsv-spv/blob/master/src/db_nodes.ts#L24)

Exponential backoff delay for the Nth consecutive failed attempt.

count 1 -> base, count 2 -> 2 * base, count 3 -> 4 * base, capped at `max`.
`count <= 0` means the node has no recorded failures and may be tried now.

## Parameters

### count

`number`

### base

`number`

### max

`number`

## Returns

`number`
