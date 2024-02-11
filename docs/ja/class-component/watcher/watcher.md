## 使用方法

`Watch`デコレーターを使用して、Vue の`watch`に該当するウォッチャーを定義できます。

最初のパラメータは監視対象の名前です。

Vue の`watch`と同様に、ウォッチャーは 2 つのパラメーターを受け取ります。すなわち更新後の値と更新前の値です。

[](./code-usage.ts ':include :type=code typescript')

## オプション

### deep

Vue の`watch` における`deep`です。

[](./code-option-deep.ts ':include :type=code typescript')

### flush

Vue の`watch` における`flush`です。

[](./code-option-flush.ts ':include :type=code typescript')

### immediate

Vue の`watch` における`immediate`です。

[](./code-option-immediate.ts ':include :type=code typescript')
