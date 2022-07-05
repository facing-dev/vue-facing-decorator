## 用法

ECMAScript类的继承被这个项目模拟到了vue组件上。

思考代码：

[](./code-example.ts ':include :type=code typescript')

这里只生成了一个vue组件。类`MyComponent`和`Super`会被这个项目合并。

> 我们不能在没有被装饰器`Component`和`ComponentBase`装饰的类上使用任何其他装饰器，例如类`Super`。