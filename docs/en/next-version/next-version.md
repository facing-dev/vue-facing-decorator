## Next version

We published a preview next version that is compatible with JavaScript decorator stage 3. To migrate to preview next vewsion, you need to change your project with some break changes.

In 3.x, decorator `Component` is same to `ComponentBase`, and you should cast class component to vue options API manually, see Breaking changes secion.

## Install

* `npm install vue-facing-decorator@beta`

* Update typescript to 5.x

* Set `compilerOptions.experimentalDecorators` to `false`, this will enable stage 3 decorator.

## Breaking changes

### Cast class component to vue options API

You must use `toNative` to cast a class component to vue options API, after that, the casted component could be used as a native vue component in where vue accepts it.

[](./breaking-changes-toNative.ts ':include :type=code typescript')

### Depreactate init class property despends on another in constructor

This is not allowed now.

[](./breaking-changes-classProperty.ts ':include :type=code typescript')

### Remove `index-return-cons`

Remove `vue-facing-decorator/dist/index-return-cons`, you won't need this if `toNative` exists.
