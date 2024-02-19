## 例

以下のコードをご覧ください。

[](./code-example.ts ':include :type=code typescript')

`Comp`(`CompSper`を含みます。), `SuperComp`(`SuperCompSuper`を含みます。) 、`VueNativeComponent`の 3 つのコンポーネントがあります。

継承関係は以下の通りです。

```
(Comp ECMAScript extends CompSuper)
    vue mixins [VueNativeComponent]
        vue extends (SuperComp ECMAScript extends SuperCompSuper)
```

Vue の実装の影響で、`VueNativeComponent`(`mixins`を使います。)は`SuperComp`(Vue の`extends`を使います。)を上書きします。
