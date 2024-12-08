## Usage

Class component supports almost all lifecycle hooks in vanilla vue. Write them as class methods directly. Hooks won't be transformed into `methods`.

> All these hooks must be methods of a class, not properties.

[](./code-usage.ts ':include :type=code typescript')



## Internal hook names list

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

## For other names

If your hook names aren't in the above list. You could use decorator `Hook`.

> e.g. Hooks from `vue-router`.

[](./code-for-other-names.ts ':include :type=code typescript')

