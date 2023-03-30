## Usage

Property getters will be tranformed into `{computed:{get:Foo}}`.

[](./code-usage.ts ':include :type=code typescript')

## Writable

Property setters will be tranformed into `{computed:{set:Foo}}`.

[](./code-writable.ts ':include :type=code typescript')

## Vanilla getter

We can define a ES vanilla getter by `@Vanilla`.

[](./code-vanilla-getter.ts ':include :type=code typescript')

## Vanilla setter

We can define a ES vanilla setter by `@Vanilla`.

[](./code-vanilla-setter.ts ':include :type=code typescript')