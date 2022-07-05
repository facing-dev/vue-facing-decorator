## Example

Consider code:

[](./code-example.ts ':include :type=code typescript')

There are three components: `Comp`(includes `CompSper`), `SuperComp`(includes `SuperCompSuper`) and `VueNativeComponent`.

The inheritance relationship is:

```
(Comp ECMAScript extends CompSuper)
    vue mixins [VueNativeComponent]
        vue extends (SuperComp ECMAScript extends SuperCompSuper)
```

Due to vue implemention, `VueNativeComponent`(useing vue `mixins`) will overwrite `SuperComp`(useing vue `extends`).