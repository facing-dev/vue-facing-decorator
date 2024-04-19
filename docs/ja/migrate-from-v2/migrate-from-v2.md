## v2 からのマイグレーション

v2 からのマイグレーションを行うにはプロジェクト内のいくつかの依存性に関わる変更が必要です。

3.x において、`Component`デコレーターは`ComponentBase`と同じものになります。そのためクラスコンポーネントを Vue Option API に手動でキャストしなければいけません。詳細は Breaking changes セクションをご覧ください。

## Breaking changes

### クラスコンポーネントから Vue Option API のキャスト

クラスコンポーネントから Vue Option API のキャストには`toNative`の使用を推奨しています。変換されたコンポーネントはネイティブ Vue が利用できる環境下であるならば、 Vue コンポーネントとして利用できます。

[](./breaking-changes-toNative.ts ':include :type=code typescript')

### コンストラクタ内での他プロパティに依存するクラスプロパティの初期化の廃止

現在、こちらは廃止されています。

[](./breaking-changes-classProperty.ts ':include :type=code typescript')

### `index-return-cons`の削除

`toNative` を使用すれば`vue-facing-decorator/dist/index-return-cons`は不要ですので削除してださい。
