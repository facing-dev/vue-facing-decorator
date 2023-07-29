## 用法

类中的访问器会被转换到vue `{computed:{get:Foo}}`中。

[](../../../en/class-component/accessor/code-usage.ts ':include :type=code typescript')

## 可写的

类中的设置器会被转换到vue `{computed:{set:Foo}}`中。

[](../../../en/class-component/accessor/code-writable.ts ':include :type=code typescript')

## 原生访问器

使用`@Vanilla`定义ES原生访问器。

[](../../../en/class-component/accessor/code-vanilla-getter.ts ':include :type=code typescript')

## 原生设置器

使用`@Vanilla`定义原生设置器。

[](../../../en/class-component/accessor/code-vanilla-setter.ts ':include :type=code typescript')