## Introdução

`vue-facing-decorator` te possibilita construir componentes vue utilizando o paradigma orientado a objetos e decorators do typescript.  

Um exemplo simples:

[](./code-what-it-is-example.ts ':include :type=code typescript')

## Instalação

Instale `vue-facing-decorator` com o seu gerenciador de pacotes preferido.

```
npm install --save vue-facing-decorator
```

Habilite `experimentalDecorators` em `tsconfig.json`, na raiz do seu projeto.

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

## Como usar ?

### Defina um componente com class

O componente por mais simples que seja precisa estender a classe base `Vue` e possuir acima dele o decorator `Component`.

[](./code-how-to-use-simplest-class-component.ts ':include :type=code typescript')


### Em Single File components (SFC)

No caso mais comum do componente vue SFC (arquivos `.vue`), o export default do vue com options API deve ser substituido por componentes em classes. 

[](./code-how-to-use-sfc.vue ':include :type=code vue')

> NÃO USE composition api script `<script setup lang="ts">`.

### Em arquivos separados com TSX

Se você não quiser utilizar SFC ( Single file components ), existe uma outra possibilidade. Ela utiliza `.ts` para definir o componente e importa o template do arquivo `.tsx`  

> Como de costume, utiliza webpack loaders para fazer o estilo de uma forma mais eficiente.

[](./code-separated-files-tsx/Comp.render.tsx ':include :type=code tsx')

[](./code-separated-files-tsx/Comp.ts ':include :type=code typescript')

[](./code-separated-files-tsx/style.css ':include :type=code css')
