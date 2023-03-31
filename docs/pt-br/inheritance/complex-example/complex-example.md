## Exemplo

Considere o código:

[](./code-example.ts ':include :type=code typescript')

Existem três componentes: `Comp`(inclui `CompSper`), `SuperComp`(inclui `SuperCompSuper`) e `VueNativeComponent`.

A relação de herença será:

```
(Comp ECMAScript extends CompSuper)
    vue mixins [VueNativeComponent]
        vue extends (SuperComp ECMAScript extends SuperCompSuper)
```

Devido a implementação do vue, `VueNativeComponent`(usando vue `mixins`) irá sobrescrever `SuperComp`(usando vue `extends`).