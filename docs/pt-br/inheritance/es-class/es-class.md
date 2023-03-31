## Utilização

As herenças de clases do ECMAScript são possíveis em componentes vue utilizando vue-facing-decorator.  

Considere o código:

[](./code-example.ts ':include :type=code typescript')

Tem apenas um componente vue gerado. A classe `MyComponent` e `Super` serão mescladas pelo vue-facing-decorator.

> Nós não podemos utilizar nenhum decorator na classe sem que o componente tenha o decorator `Component` em cima dele, veja a classe `Super`. 