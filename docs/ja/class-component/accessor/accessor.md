## 使用方法

`getters`プロパティは`{computed:{get:Foo}}`に変換されます。

[](./code-usage.ts ':include :type=code typescript')

## 書き込み可能な算出関数

`setters`プロパティは`{computed:{set:Foo}}`に変換されます。

[](./code-writable.ts ':include :type=code typescript')

## Vanilla ゲッター

`@Vanilla`でES vanillaのゲッターを定義できます。

[](./code-vanilla-getter.ts ':include :type=code typescript')

## Vanilla セッター

`@Vanilla`でES vanillaのセッターを定義できます。

[](./code-vanilla-setter.ts ':include :type=code typescript')