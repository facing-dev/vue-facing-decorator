## 用法

类组件支持几乎全部的vue原生生命周期钩子。将它们直接当作方法写入类中。这些钩子不会被转换进入vue `methods`。

> 这些钩子必须定义为类的方法，而不能是属性。

[](./code-usage.ts ':include :type=code typescript')

## 钩子名称列表

```javascript
[
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "beforeDestroy",
    "beforeUnmount",
    "destroyed",
    "unmounted",
    "renderTracked",
    "renderTriggered",
    "errorCaptured",
    "serverPrefetch",
    "render"
]
```

## 其他钩子名称

如果你的钩子名称不再上面的列表中，你可以使用装饰器`Component`的`options`或`modifier`选项。

> 例如`vue-router`中的钩子。

[](./code-for-other-names.ts ':include :type=code typescript')

