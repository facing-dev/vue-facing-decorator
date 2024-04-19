## 使用方法

クラスコンポーネントは Vanilla Vue のすべてのライフサイクルフックをサポートしています。クラスメソッドのように直接的に書くことができます。ただし、`methods`に変換されることはありません。

> これらのフックはすべてクラス内のプロパティではなくメソッドのように記述してください。

[](./code-usage.ts ':include :type=code typescript')

## 定義済みフック一覧

```javascript
[
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'beforeDestroy',
    'beforeUnmount',
    'destroyed',
    'unmounted',
    'renderTracked',
    'renderTriggered',
    'errorCaptured',
    'serverPrefetch',
    'render',
];
```

## 上記以外のフック

`Hook`デコレーターを使用して、独自のライフサイクルフックを定義できます。

> e.g. Hooks from `vue-router`.

[](./code-for-other-names.ts ':include :type=code typescript')
