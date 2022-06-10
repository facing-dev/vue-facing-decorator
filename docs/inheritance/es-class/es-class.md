## Usage
ECMAScript class inheritance is simulated by `vue-facing-decorator` to vue components.

Consider code:

[](./code-example.ts ':include :type=code typescript')

There is one vue component generated. Class `MyComponent` and `Super` will be merged by by `vue-facing-decorator`.

> We can't use any decorators in a class without `Component` decorated, e.g. `Super` class.