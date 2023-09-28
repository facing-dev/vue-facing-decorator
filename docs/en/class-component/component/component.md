## Usage

Use decorator `Component` to decorate a class which extends from `Vue` base class.

[](./code-usage-base.ts ':include :type=code typescript')

## Options

### name

This is the `name` in vue options API.

[](./code-option-name.ts ':include :type=code typescript')

### emits

This is the `emits` in vue options API.

[](./code-option-emits.ts ':include :type=code typescript')

### provide

This is the `provide` in vue options API.

[](./code-option-provide.ts ':include :type=code typescript')

### components

This is the `components` in vue options API.

[](./code-option-components.ts ':include :type=code typescript')

### directives

This is the `directives` in vue options API.

[](./code-option-directives.ts ':include :type=code typescript')

### inheritAttrs

This is the `inheritAttrs` in vue options API.

[](./code-option-inherit-attrs.ts ':include :type=code typescript')

### expose

This is the `expose` in vue options API.

[](./code-option-expose.ts ':include :type=code typescript')

### render

This is the `render` in vue options API.

If you use vue Single-File component. The render will be applied to the `export default` component automatically.

> This will overwrite the render in class body.

[](./code-option-render.ts ':include :type=code typescript')

### setup

This is the `setup` in vue options API, but can not return a render function.

[](./code-option-setup.ts ':include :type=code typescript')

### template

This is the `template` in vue options API.

> To use these feature, you need the full bundle of vue includes template compiler.

[](./code-option-template.ts ':include :type=code typescript')

### mixins

This is the `mixins` in vue options API. It only accepts native vue component(if you want to pass a class component, use `toNative` to transform it).

[](./code-option-mixins.ts ':include :type=code typescript')


### methods

Methods in this field will be exposed to the component.

[](./code-option-methods.ts ':include :type=code typescript')

### options

It will be assigned to vue options API before `modifier`.

> This option belongs to `vue-facing-decorator`.

[](./code-option-options.ts ':include :type=code typescript')

### modifier

Finally, we can use this function to modify the generated vue options API directly.

> This option belongs to `vue-facing-decorator`.

[](./code-option-modifier.ts ':include :type=code typescript')
