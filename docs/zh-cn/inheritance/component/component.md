## 用法

使用装饰器`ComponentBase`去定义一个父组件。它的选项和迭代器`Component`相同。

`vue-facing-decorator`生成的组件间可以直接继承。

思考代码：

[](./code-example.ts ':include :type=code typescript')

这里有两个组件：`MyComponent`和`SuperComponent`。继承是通过vue `extends`实现的。

## 继承多组件

使用 `mixins` 函数来继承多个通过 `ComponentBase` 装饰的组件。

[](./code-mixins-function.ts ':include :type=code typescript')

## 关于vue原生组件

使用`mixins`来合并vue原生组件。

思考代码：

[](./code-native.ts ':include :type=code typescript')

`VueNativeComponent`是vue option api原生组件，它被混入了`MyComponent`。`VueNativeComponent`的类型信息丢失了，所以我们构建了一个类型上下文`VueNativeComponentContext`。

> `mixins`和`extends`参照[vue的实现方式](https://vuejs.org/api/options-composition.html#extends)。