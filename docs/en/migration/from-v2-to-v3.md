## Migrate from v2 to v3

To migrate from v2, you need to change your project with some break changes.

In 3.x, decorator `Component` is same to `ComponentBase`, and you should cast class component to vue options API manually, see Breaking changes section.

## Breaking changes

### Cast class component to vue options API

It is recommended to use `toNative` to transform a class component into a vue options API component, after that, the transformed component could be used as a native vue component in where vue accepts it.

[](./from-v2-to-v3-breaking-changes-toNative.ts ':include :type=code typescript')

### Depreactate init class property despends on another in constructor

This is not allowed now.

[](./from-v2-to-v3-breaking-changes-classProperty.ts ':include :type=code typescript')

### Remove `index-return-cons`

Remove `vue-facing-decorator/dist/index-return-cons`, you won't need this if `toNative` exists.
