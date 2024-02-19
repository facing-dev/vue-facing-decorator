## 使用方法

`vue-facing-decorator`が作成するコンポーネント間では継承をすることができます。

以下のコードをご覧ください。

[](./code-example.ts ':include :type=code typescript')

Vue の`extends`によって、`MyComponent` は `SuperComponent`を継承しています。

## コンポーネントの多重継承

`mixins`関数を使用して、多重継承ができます。

[](./code-mixins-function.ts ':include :type=code typescript')

## Vue ネイティブコンポーネント向け

`mixins`を使用して、Vue ネイティブコンポーネントをマージします。

以下のコードをご覧ください。

[](./code-native.ts ':include :type=code typescript')

Vue Option API によって定義された`VueNativeComponent`は`MyComponent`の mixin に使用されています。

`VueNativeComponent` の型情報は失われますので、`VueNativeComponentContext`という型でコンテクストを作成する必要があります。

> `mixins` および、 `extends`の実装は[こちら](https://vuejs.org/api/options-composition.html#extends)からご覧ください。
