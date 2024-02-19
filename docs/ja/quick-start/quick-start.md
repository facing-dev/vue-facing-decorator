## イントロダクション

`vue-facing-decorator` は TypeScript のデコレーターと、オブジェクト指向プログラミングによる Vue コンポーネントの作成を提供します。

例:

[](./code-what-it-is-example.ts ':include :type=code typescript')

## インストール

### TypeScript プロジェクト

任意のパッケージマネージャーで`vue-facing-decorator`をインストールしてください。

```
npm install --save vue-facing-decorator
```

プロジェクトのルートディレクトリにある`tsconfig.json`の`experimentalDecorators`を有効にしてください。

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

### JavaScript プロジェクト

#### Vite

1.  必要な依存パッケージをインストールしてください。

    ```shell
    npm install @haixing_hu/vue3-class-component
    npm install @babel/core @babel/runtime @babel/preset-env
    npm install @babel/plugin-proposal-decorators @babel/plugin-transform-class-properties @babel/plugin-transform-runtime
    ```

2.  [@babel/plugin-transform-class-properties]および、[@babel/plugin-proposal-decorators]プラグインを使用して、[Babel] を設定してください。[Babel]の設定ファイル名は`babelrc.json`であることが多く、以下のような内容です。

    ```json
    {
        "presets": [["@babel/preset-env", { "modules": false }]],
        "plugins": [
            "@babel/plugin-transform-runtime",
            ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
            "@babel/plugin-transform-class-properties"
        ]
    }
    ```

    **Note:** [vite]が含まれている場合, 必ず`@babel/preset-env`の`modules` パラメーターを`false`に設定してください。

3.  [Babel]を利用するため、`vite.config.js`で[vite]を設定してください。設定ファイル名は `vite.config.js` であることが多く、以下のような内容です。

    ```js
    import { fileURLToPath, URL } from 'node:url';
    import { defineConfig } from 'vite';
    import vue from '@vitejs/plugin-vue';
    import * as babel from '@babel/core';

    // A very simple Vite plugin support babel transpilation
    const babelPlugin = {
        name: 'plugin-babel',
        transform: (src, id) => {
            if (/\.(jsx?|vue)$/.test(id)) {
                // the pattern of the file to handle
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
                    babelParserPlugins: ['decorators'], // must enable decorators support
                },
            }),
            babelPlugin, // must be after the vue plugin
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    });
    ```

#### Webpack

1.  必要な依存パッケージをインストールしてください。

    ```shell
    npm install @haixing_hu/vue3-class-component
    npm install @babel/core @babel/runtime @babel/preset-env
    npm install @babel/plugin-proposal-decorators @babel/plugin-transform-class-properties @babel/plugin-transform-runtime
    ```

2.  [@babel/plugin-transform-class-properties]および、[@babel/plugin-proposal-decorators]プラグインを使用して、[Babel] を設定してください。[Babel]の設定ファイル名は`babelrc.json`であることが多く、以下のような内容です。

    ```json
    {
        "presets": ["@babel/preset-env"],
        "plugins": [
            "@babel/plugin-transform-runtime",
            ["@babel/plugin-proposal-decorators", { "version": "2023-05" }],
            "@babel/plugin-transform-class-properties"
        ]
    }
    ```

## 使用方法

### クラスコンポーネントの定義

最も単純なクラスコンポーネントの作成には`Vue`ベースクラスを継承しなくてはいけません。加えて、このリポジトリからインポートした`Component` でデコレートする必要があります。

[](./code-how-to-use-simplest-class-component.ts ':include :type=code typescript')

### 単一ファイルコンポーネント

単一ファイルコンポーネント(`.vue`ファイル)でよく見られる `defineComponent` Vue Option API はクラスコンポーネントで書かれるべきです。

[](./code-how-to-use-sfc.vue ':include :type=code text')

> Composition API 構文 `<script setup lang="ts">`を使用しないでください。

### TSX との分割

単一ファイルコンポーネントを使う以外にも他の選択肢があります。`.ts` ファイルでコンポーネントの定義を行い、`.tsx` ファイルからテンプレートをインポートする方法です。

> webpack loaders でスタイルを効果的に編集しましょう。

[](./code-separated-files-tsx/Comp.render.tsx ':include :type=code tsx')

[](./code-separated-files-tsx/Comp.ts ':include :type=code typescript')

[](./code-separated-files-tsx/style.css ':include :type=code css')

### `toNative`の使用

Vue はクラスコンポーネントを直接扱うことはできません。クラスコンポーネントをネイティブな Vue Option API へ変換するためには`toNative`を使用してください。その後、`toNative`で得られた結果は Vanilla Vue API へ渡さなければいけません。

[](./code-use-toNative.ts ':include :type=code typescript')
