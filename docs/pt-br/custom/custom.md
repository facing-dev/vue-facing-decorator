## Utilização

Use `createDecorator` para construir seus próprios decorators.

Se você é um autor de algum package, instale vue-facing-decorator como `devDependecies` e marque-a dentro de `peerDependencies`.


`createDecorator` recebe uma função criadora, a qual aceita dois parâmetros: 

1. Componentes Vue gerados com options API, você pode modifica-lo para implementar o que você quiser.
2. A key da propriedade da classe(ou método), o qual o decorator irá ser aplicado.

[](./code-usage.ts ':include :type=code typescript')
