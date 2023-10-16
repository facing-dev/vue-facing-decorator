## 介绍

`vue-facing-decorator` 提供面向对象类和TypeScript装饰器的方式来写vue组件。

简单例子:

[](../../en/quick-start/code-what-it-is-example.ts ':include :type=code typescript')

## 安装

### TypeScript 项目

使用你喜欢的包管理器来安装`vue-facing-decorator`。

```
npm install --save vue-facing-decorator
```

在项目根目录中的`tsconfig.json`中开启`experimentalDecorators`。

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```


### JavaScript 项目

#### Vite

1.  安装依赖:

    ```shell
    npm install @haixing_hu/vue3-class-component
    npm install @babel/core @babel/runtime @babel/preset-env
    npm install @babel/plugin-proposal-decorators @babel/plugin-transform-class-properties @babel/plugin-transform-runtime
    ```

2.  配置`babel.config.json`文件：

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

    **Note:** `@babel/preset-env` 的 `modules` 选项必须为 `false`。

3.  配置 `vite.config.js` ：

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
            babelParserPlugins: ['decorators'],     // 必须开启 decorators 支持
          },
        }),
        babelPlugin,                                // 在 vue plugin 之后
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
    });
    ```

#### Webpack

1.  安装依赖：

    ```shell
    npm install @haixing_hu/vue3-class-component
    npm install @babel/core @babel/runtime @babel/preset-env
    npm install @babel/plugin-proposal-decorators @babel/plugin-transform-class-properties @babel/plugin-transform-runtime
    ```

2.  配置`babel.config.json`文件：

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

## 如何使用?

### 定义一个类组件

类组件必须继承这个项目的`Vue`基类并且应用这个项目的`Component`装饰器。

[](../../en/quick-start/code-how-to-use-simplest-class-component.ts ':include :type=code typescript')


### 在vue SFC中使用

在SFC中(`.vue` 文件)，使用类组件作为默认导出的内容。

[](../../en/quick-start/code-how-to-use-sfc.vue ':include :type=code text')

> ！！！不要使用 composition api `<script setup lang="ts">`。

### 分割文件和TSX

如果你不想使用SFC，你还可以在`.ts`文件中定义组件并且在`.tsx`文件中定义模板，然后组合他们。

> 像往常一样在通过webpack来管理CSS样式。

[](../../en/quick-start/code-separated-files-tsx/Comp.render.tsx ':include :type=code tsx')

[](../../en/quick-start/code-separated-files-tsx/Comp.ts ':include :type=code typescript')

[](../../en/quick-start/code-separated-files-tsx/style.css ':include :type=code css')

### 使用 `toNative`

类组件不能被VUE直接使用，所以我们需要使用`toNative`来将他们转换为VUE原生组件。你必须在VUE的原始API中使用转换后的组件（也就是`toNative`的返回值）。

[](../../en/quick-start/code-use-toNative.ts ':include :type=code tsx')