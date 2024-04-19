## Introduction

`vue-facing-decorator` provides abilities to build vue components with OOP classes and typescript decorators.

A sample example:

[](./code-what-it-is-example.ts ':include :type=code typescript')

## Installation

### In TypeScript projects

Install `vue-facing-decorator` with your favorite package manager.

```
npm install --save vue-facing-decorator
```

Enable `experimentalDecorators` in `tsconfig.json` in project root directory.

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

### In JavaScript projects

`vue-facing-decorator` could be used in pure JavaScript Vue projects. you must enable decorator features manully(e.g. transform decorators by `babel`).

## How to use?

### Define a class component

A simplest class component must extends `Vue` base class and be decorated by `Component` from this repo.

[](./code-how-to-use-simplest-class-component.ts ':include :type=code typescript')


### In vue Single-File components

In common used vue Single-File components(`.vue` files), the default exported vue options API should be replaced by class component.

[](./code-how-to-use-sfc.vue ':include :type=code text')

> DO NOT USE composition api script `<script setup lang="ts">`.

### In separated files with TSX

If you don't want to use Single-File components, this is another choice. It use `.ts` file to define component and import template from `.tsx` file.

> Make style effective by webpack loaders as usual.

[](./code-separated-files-tsx/Comp.render.tsx ':include :type=code tsx')

[](./code-separated-files-tsx/Comp.ts ':include :type=code typescript')

[](./code-separated-files-tsx/style.css ':include :type=code css')

### Use `toNative`

Class components couldn't be used by vue immediately, so we need to use `ToNative` to transform them into native vue options API components. You MUST pass the transformed components(returned by `toNative`) into vanilla vue APIs.

[](./code-use-toNative.ts ':include :type=code typescript')