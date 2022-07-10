## 用法

开启TSX属性类型你需要：

1. 从这个项目中引入`TSX`函数。

2. 定义一个描述组件属性的接口（例如`Props`）。

3. 定义一个描述组件事件的接口（例如`Events`）。

4. 使组件继承`TSX<Props,Events>()(BaseComponent)`.

> `Events`中的键会变为首字母大写并被加前缀`on`，例如`myEvent` => `onMyEvent`。

> `TSX<Props,Events>`后有两个`()`。

[](./code-usage.tsx ':include :type=code tsx')

## 组件内属性类型检查

你可以通过`implements`来检查组件是否实现了属性。

[](./code-type-checking.tsx ':include :type=code tsx')

## 组件继承

TSX属性支持组件继承。

[](./code-component-inheritance.tsx ':include :type=code tsx')



