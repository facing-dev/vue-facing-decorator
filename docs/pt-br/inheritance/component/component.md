## Utilização

Utilize o decorator `ComponentBase` para definir um 'super' componente. Os seus parametros são os mesmos do decorator `Component`.

Componentes os quais são gerados pelo `vue-facing-decorator` podem herdar outros componentes diretamente.

Considere o código:

[](./code-example.ts ':include :type=code typescript')

Exitem dois componentes: `MyComponent` e `SuperComponent`. A herança é implementada pelo vue com `extends`. 

## Estender múltiplos componentes

Use `mixins` para estender múltiplos componentes que utilizam o decorator `ComponentBase`.

[](./code-mixins-function.ts ':include :type=code typescript')



## Para componentes nativos

Use `mixins` para mesclar dois componentes nativos.

Considere o código:

[](./code-native.ts ':include :type=code typescript')

`VueNativeComponent` é um componente definido pelo vue option api e um mixin em `MyComponent`. 
O tipo da informação em `VueNativeComponent` será perdido. Então é preciso construir um tipo com o contexto, como feito com `VueNativeComponentContext`.  

> A estratégia de `mixins` e `extends` é de acordo com a [implementação do vue](https://vuejs.org/api/options-composition.html#extends).