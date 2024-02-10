## 使用方法

`Model`デコレーターを使用して、Vue の`v-model`または、`v-model:foo`に該当する双方向バインディングを定義できます。

> 従来の`VModel`デコレーターのエイリアスです。`VModel` はサポート予定ですが、`Model`の使用を推奨します。

[](./code-usage.ts ':include :type=code typescript')

## オプション

### name

`v-model`プロパティにおける名前です。デフォルトは`modelValue`になります。

[](./code-option-name.ts ':include :type=code typescript')

### その他

その他のオプションは`Prop` デコレーターと同様です。

[](./code-option-others.ts ':include :type=code typescript')
