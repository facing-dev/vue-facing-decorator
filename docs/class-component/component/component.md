## Usage

Use decorator `Component` to decorate a class which extends from `Vue` base class.

[](./code-usage-base.ts ':include :type=code typescript')

## Options

### name

This is the `name` in vue option component api.

[](./code-option-name.ts ':include :type=code typescript')

### emits

This is the `emits` in vue option component api.

[](./code-option-emits.ts ':include :type=code typescript')

### provide

This is the `provide` in vue option component api.

[](./code-option-provide.ts ':include :type=code typescript')

### components

This is the `components` in vue option component api.

[](./code-option-components.ts ':include :type=code typescript')

### directives

This is the `directives` in vue option component api.

[](./code-option-directives.ts ':include :type=code typescript')

### inheritAttrs

This is the `inheritAttrs` in vue option component api.

[](./code-option-inherit-attrs.ts ':include :type=code typescript')

### expose

This is the `expose` in vue option component api.

[](./code-option-expose.ts ':include :type=code typescript')

### render

This is the `render` in vue option component api.

If you use vue Single-File component. The render will be applied to the `export default` component automatically.

> This will overwrite the render in class body.

[](./code-option-template.ts ':include :type=code typescript')

### template

This is the `template` in vue option component api.

> To use these feature, you need the full bundle of vue includes template compiler.

[](./code-option-template.ts ':include :type=code typescript')

### mixins

This is the `mixins` in vue option component api.

[](./code-option-mixins.ts ':include :type=code typescript')

### options

It will be assigned to vue option component before `modifier`.

> This option belongs to `vue-facing-decorator`.

[](./code-option-options.ts ':include :type=code typescript')

### modifier

Finally, we can use this function to modify the generated vue option component directly.

> This option belongs to `vue-facing-decorator`.

[](./code-option-modifier.ts ':include :type=code typescript')
