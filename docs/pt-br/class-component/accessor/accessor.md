## Utilização

Getters de uma propriedade será transformada em `{computed:{get:Foo}}`.

[](./code-usage.ts ':include :type=code typescript')

## Escrita

Setters de uma propriedade será transformada em `{computed:{set:Foo}}`.

[](./code-writable.ts ':include :type=code typescript')

## Vanilla getter

Nós podemos definir um getter utilizando ES vanilla com `@Vanilla`.

[](./code-vanilla-getter.ts ':include :type=code typescript')

## Vanilla setter

Nós podemos definir também um setter utilizando ES vanilla com `@Vanilla`.

[](./code-vanilla-setter.ts ':include :type=code typescript')