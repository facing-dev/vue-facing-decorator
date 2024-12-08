## Example

Consider code:

[](./code-example.ts ':include :type=code typescript')

There are three components: `Comp`(includes `CompSuper`), `SuperComp`(includes `SuperCompSuper`) and `VueNativeComponent`.

The inheritance relationship is:

```
(Comp ECMAScript extends CompSuper)
    vue mixins [VueNativeComponent]
        vue extends (SuperComp ECMAScript extends SuperCompSuper)
```

Due to vue implementation, `VueNativeComponent`(using vue `mixins`) will overwrite `SuperComp`(using vue `extends`).