## Usage

Class component supports almost all lifecycle hooks in vanilla vue. Write then as class methods directly. Hooks won't be tranformed into `methods`.

[](./code-usage.ts ':include :type=code typescript')

## Lsit of lifecycle hook names

```javascript
[
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "beforeDestroy",
    "beforeUnmount",
    "destroyed",
    "unmounted",
    "renderTracked",
    "renderTriggered",
    "errorCaptured",
    "serverPrefetch",
    "render"
]
```

All these hooks must be methods of a class, not properties.

## For other names

If your hook names aren't in the above list. You could use `options` or `modifier` in `Component` decorator.

> e.g. Hooks from `vue-router`.

[](./code-for-other-names.ts ':include :type=code typescript')

