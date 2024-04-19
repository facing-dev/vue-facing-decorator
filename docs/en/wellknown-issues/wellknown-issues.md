## Don't use `this` context while declaring class fields

When `useDefineForClassFields` is `true` in ts config, we can't access fields on `this` context while declaring class fields.

[](./do-not-use-this.ts ':include :type=code typescript')

## Use Vitest

If you have some error when use v-f-d with  test framework, use Vitest instead of it.

https://github.com/facing-dev/vue-facing-decorator/issues/54#issuecomment-1500019388
https://github.com/facing-dev/vue-facing-decorator/issues/33#issuecomment-1410648544

## Lake of IDE type supports

We can't provide  full IDE type support at the moment. It's recommended to use tsx as render to have type supports as more as we can do. It will be kept improving in the future.