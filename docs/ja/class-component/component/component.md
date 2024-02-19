## 使用方法

`Vue`クラスを継承しているクラスに`Component`デコレーターを使用してください。

[](./code-usage-base.ts ':include :type=code typescript')

## オプション

### name

Vue Options API における`name`です。

[](./code-option-name.ts ':include :type=code typescript')

### emits

Vue Options API における`emits`です。

[](./code-option-emits.ts ':include :type=code typescript')

### provide

Vue Options API における`provide`です。

[](./code-option-provide.ts ':include :type=code typescript')

### components

Vue Options API における`components`です。

[](./code-option-components.ts ':include :type=code typescript')

### directives

Vue Options API における`directives`です。

[](./code-option-directives.ts ':include :type=code typescript')

### inheritAttrs

Vue Options API における`inheritAttrs`です。

[](./code-option-inherit-attrs.ts ':include :type=code typescript')

### expose

Vue Options API における`expose`です。

[](./code-option-expose.ts ':include :type=code typescript')

### render

Vue Options API における`render`です。

単一ファイルコンポーネントの場合、`render`は自動的にコンポーネントを`export default`として扱います。

> クラス本体のレンダリングを上書きします。

[](./code-option-render.ts ':include :type=code typescript')

### setup

Vue Options API における`setup`です。ただし、レンダー関数を返すことはできません。

[](./code-option-setup.ts ':include :type=code typescript')

### template

Vue Options API における`template`です。

> 使用時にはテンプレートコンパイラーを含む Vue のフルバンドルが必要になります。

[](./code-option-template.ts ':include :type=code typescript')

### mixins

Vue Options API における`mixins`です。ネイティブ Vue コンポーネントでのみ使用できます。(パラメーターにクラスコンポーネントを渡したい場合、`toNative`を使用してください。)

[](./code-option-mixins.ts ':include :type=code typescript')

### methods

このフィールド内に定義されたメソッドはコンポーネント内で使用できます。

[](./code-option-methods.ts ':include :type=code typescript')

### options

`modifier`の前に任意の Vue Option API を設定します。

> `vue-facing-decorator`にのみ存在するオプションです。

[](./code-option-options.ts ':include :type=code typescript')

### modifier

生成された Vue Option API を直接変更します。

> `vue-facing-decorator`にのみ存在するオプションです。

[](./code-option-modifier.ts ':include :type=code typescript')
