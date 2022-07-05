## 示例

思考下面的代码：

[](./code-example.ts ':include :type=code typescript')

这里有三个组件`Comp`(包含 `CompSper`), `SuperComp`(包含 `SuperCompSuper`) 和 `VueNativeComponent`。

继承关系是

```
(Comp ECMAScript extends CompSuper)
    vue mixins [VueNativeComponent]
        vue extends (SuperComp ECMAScript extends SuperCompSuper)
```

因为vue的设计原因，使用vue `mixins`的`VueNativeComponent`会覆盖使用vue `extends`的`SuperComp`。