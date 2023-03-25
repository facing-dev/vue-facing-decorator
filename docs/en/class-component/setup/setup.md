## Usage

Use the `setup` function exported from `'vue-facing-decorator'` to inject [composables](https://vuejs.org/guide/reusability/composables.html) into your component's class as data.

[](./code-usage-base.ts ':include :type=code typescript')

## Options

You can also provide your own custom setup function as part of the component options, but be aware that if you do this, the `setup()` function from `'vue-facing-decorator'` will no longer work to inject data, and any properties you return from that setup will only be accessible in the component's template or render function.

[](./code-option-setup.ts ':include :type=code typescript')

