## 使用方法

ECMAScript のクラス継承は疑似的に Vue コンポーネントへと変換されます。

以下のコードをご覧ください。

[](./code-example.ts ':include :type=code typescript')

`MyComponent`クラスと`Super`クラスがマージされ、1 つの Vue コンポーネントのみ生成されます。

> `Component`デコレーターがない場合、いかなるデコレーターもクラス内で使用することができません。例)`Super`クラス
