## 用法

我们可以使用装饰器`Emit`来定义一个触发vue事件的方法。

这个装饰器接收一个可以省略的事件名称作为参数。将会触发以这个名称命名的事件，并且以方法的返回值作为事件数据。如果事件名称省略，默认将会用方法名称作为事件名称。

[](../../../en/class-component/event/code-usage.ts ':include :type=code typescript')

## 异步事件

如果一个事件方法返回值是`Promise`，事件会在这个异步被解决后触发，数据是这个异步的解决值。

[](../../../en/class-component/event/code-asynchronous.ts ':include :type=code typescript')