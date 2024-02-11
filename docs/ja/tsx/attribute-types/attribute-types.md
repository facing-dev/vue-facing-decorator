## 使用方法

TSX アトリビュートタイプを有効化するために:

1. `TSX`関数をこのリポジトリからインポートしてください。

2. コンポーネント内のプロパティを詳述するためのインタフェースを定義してください。例) `Props`

3. コンポーネント内のイベントを詳述するためのインタフェースを定義してください。例) `Events`

4. `TSX<Props,Events>()(BaseComponent)`を継承したコンポーネントを作成してください。

> `Events`は頭文字が大文字になり、先頭に`on`が付与されます。例) `myEvent` => `onMyEvent`

> `Events`の値が非関数型の場合、自動的に関数型に変換されます。変換された関数の定義は`Events`の値のデータ型のパラメーターを 1 つ受け取り、戻り値は`any`になります。例)`{myEvent:string}` => `{myEvent:(param:string)=>any}`

> `TSX<Props, Events>`の後ろには`()`が必要です。

[](./code-usage.tsx ':include :type=code tsx')

## コンポーネントのプロパティの型チェック

プロパティが`implements`によって実装されている場合、チェック可能です。

[](./code-type-checking.tsx ':include :type=code tsx')

## コンポーネントの継承

TSX アトリビュート はコンポーネントの継承をサポートしています。

[](./code-component-inheritance.tsx ':include :type=code tsx')
