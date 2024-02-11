## 使用方法

`createDecorator`を使用して、独自のデコレーターを作成できます。

パッケージ作成者の場合、 vue-facing-decorator を`devDependencies`としてインストール後、`peerDependencies`に追加してください。

`createDecorator`は以下の 2 つのパラメーターを含む関数がパラメーターになります。

1. 生成される Vue オプションコンポーネントです。自由に実装の変更ができます。
2. デコレート予定のクラスプロパティ/メソッドのキー

加えてオプションのオブジェクトを設定することができます。

[](./code-usage.ts ':include :type=code typescript')

## オプション

### `preserve`

`preserve`オプションはデコレートした値をデコレーションの適応以前に保持するかどうかを指定します。

[](./code-usage.ts ':include :type=code typescript')

上記のコードで`preserve`が`false`の場合、`methods`にある`method`にはアクセスはできません。
