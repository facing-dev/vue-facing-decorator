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

#### Vite

1.  Install the required dependencies:

    ```shell
    npm install @haixing_hu/vue3-class-component
    npm install @babel/core @babel/runtime @babel/preset-env
    npm install @babel/plugin-proposal-decorators @babel/plugin-transform-class-properties @babel/plugin-transform-runtime
    ```

2.  Configure [Babel] by using [@babel/plugin-transform-class-properties] and
    [@babel/plugin-proposal-decorators] plugins. A possible [Babel] configuration
    file `babelrc.json` is as follows:

    ```json
    {
      "presets": [
        ["@babel/preset-env", { "modules": false }]
      ],
      "plugins": [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
        "@babel/plugin-transform-class-properties"
      ]
    }
    ```

    **Note:** When bundling with [vite], make sure to set the `modules` parameter
    of `@babel/preset-env` to `false`.

3.  Configure [vite] by modifying the `vite.config.js` file to add support for
    [Babel]. A possible `vite.config.js` file is as follows:

    ```js
    import { fileURLToPath, URL } from 'node:url';
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import * as babel from '@babel/core';

    // A very simple Vite plugin support babel transpilation
    const babelPlugin = {
      name: 'plugin-babel',
      transform: (src, id) => {
        if (/\.(jsx?|vue)$/.test(id)) {              // the pattern of the file to handle
          return babel.transform(src, {
            filename: id,
            babelrc: true,
          });
        }
      },
    };

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        vue({
          script: {
            babelParserPlugins: ['decorators'],     // must enable decorators support
          },
        }),
        babelPlugin,                                // must be after the vue plugin
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    });
    ```

#### Webpack

1.  Install the required dependencies:

    ```shell
    npm install @haixing_hu/vue3-class-component
    npm install @babel/core @babel/runtime @babel/preset-env
    npm install @babel/plugin-proposal-decorators @babel/plugin-transform-class-properties @babel/plugin-transform-runtime
    ```

2.  Configure [Babel] by using the [@babel/plugin-transform-class-properties]
    and [@babel/plugin-proposal-decorators] plugins. A possible [Babel]
    configuration file `babelrc.json` is as follows:

    ```json
    {
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
        "@babel/plugin-transform-class-properties"
      ]
    }
    ```

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