## 用法

开启TSX属性类型你需要：

1. 从这个项目中引入`TSX`函数。

2. 定义一个描述组件属性的接口（例如`Props`）。

3. 定义一个描述组件事件的接口（例如`Events`）。

4. 使组件继承`TSX<Props,Events>()(BaseComponent)`.

> `Events`中的键会变为首字母大写并被加前缀`on`，例如`myEvent` => `onMyEvent`。

> 如果一个`Events`的值是非函数类型，它的类型会被转换为一个函数，这个函数仅仅接受一个前面定义值的类型的参数并且返回`any`类型。例如`{myEvent:string}` => `{myEvent:(param:string)=>any}`。

> `TSX<Props,Events>`后有两个`()`。

[](../../../en//tsx/attribute-types/code-usage.tsx ':include :type=code tsx')

## 组件内属性类型检查

你可以通过`implements`来检查组件是否实现了属性。

[](../../../en//tsx/attribute-types/code-type-checking.tsx ':include :type=code tsx')

## 组件继承

TSX属性支持组件继承。

[](../../../en//tsx/attribute-types/code-component-inheritance.tsx ':include :type=code tsx')



