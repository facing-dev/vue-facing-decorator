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

`vue-facing-decorator` could be used in pure JavaScript Vue projects. you must enable decorator features manully(e.g. transform decorators by `babel`).

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
