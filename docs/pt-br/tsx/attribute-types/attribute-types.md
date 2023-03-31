## Utilização

Para habilitar tipagem em atributos com TSX:

1. Importe a função `TSX` do vue-facing-decorator.

2. Define a interface ( ex: `Props` ) para declarar as propriedades do componente.
 
3. Define a interface ( ex: `Events` ) para declarar os eventos do componente.

4. Faça um componente que estenda `TSX<Props,Events>()(BaseComponent)`.

> As chaves de `Events` serão capitalizadas e prefixadas com `on`. ex: `myEvent` => `onMyEvent`

> Se o valor de `Events` tem o tipo diferente de função, o tipo será transformado numa função que aceite apenas um parametro tipado pelo mesmo tipo do valor recebido e irá retornar um tipo `any`. exemplo: `{myEvent:string}` => `{myEvent:(param:string)=>any}`.

> Tem-se dois `()` depois de `TSX<Props,Events>`.

[](./code-usage.tsx ':include :type=code tsx')

## Validando os tipos das propriedades dos componentes 

Nós podemos validar se o componente implementa uma propriedade com o `implements`.

[](./code-type-checking.tsx ':include :type=code tsx')

## Herança de componentes

Atributos TSX suportam herança de componentes.

[](./code-component-inheritance.tsx ':include :type=code tsx')



