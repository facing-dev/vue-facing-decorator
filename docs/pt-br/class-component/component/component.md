## Utilização

Utilize o decorator `Component` para declarar uma classe a qual irá estender a classe base `Vue`.

[](./code-usage-base.ts ':include :type=code typescript')

## Opções

### nome

Assim fica a propriedade `name` do vue options API.

[](./code-option-name.ts ':include :type=code typescript')

### emits

Assim fica a propriedade `emits` do vue options API.

[](./code-option-emits.ts ':include :type=code typescript')

### provide

Assim fica a propriedade `provide` do vue options API.

[](./code-option-provide.ts ':include :type=code typescript')

### componentes

Assim fica a propriedade `components` do vue options API.

[](./code-option-components.ts ':include :type=code typescript')

### directivas

Assim fica a propriedade `directives` do vue options API.

[](./code-option-directives.ts ':include :type=code typescript')

### inheritAttrs

Assim fica a propriedade `inheritAttrs` do vue options API.

[](./code-option-inherit-attrs.ts ':include :type=code typescript')

### expose

Assim fica a propriedade `expose` do vue options API.

[](./code-option-expose.ts ':include :type=code typescript')

### render

Assim fica a propriedade `render` do vue options API.

Se você utiliza SFC ( Single File components ). O método render será aplicado ao `export default` do componente automáticamente.

> Isso irá sobrescrever o método render de dentro da classe.

[](./code-option-render.ts ':include :type=code typescript')

### setup

Assim fica a propriedade `setup` do vue options API, mas não pode retornar uma função render. 

[](./code-option-setup.ts ':include :type=code typescript')

### template

Assim fica a propriedade `template` do vue options API.


> Para usar esse recurso, você precisa que o bundle do vue inclua o vue template compiler.

[](./code-option-template.ts ':include :type=code typescript')

### mixins

Assim fica a propriedade `mixins` do vue options API.

[](./code-option-mixins.ts ':include :type=code typescript')

### opções

Será inserido no vue options API antes de `modifier`.

> Essa opção pertence ao `vue-facing-decorator`.

[](./code-option-options.ts ':include :type=code typescript')

### modificador

Finalmente, nós podemos utilizar essa função para modificar diretamente o vue options API gerado.

> Essa opção também pertence ao `vue-facing-decorator`.

[](./code-option-modifier.ts ':include :type=code typescript')
