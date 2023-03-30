## Utilização

Componentes no formato de classes suportam quase todos os hooks de ciclo de vida definidos no vue. Você pode escrever todos os métodos diretamente na classe. Os Hooks não serão transformados em `methods`.

> Todos esses hooks precisam ser métodos internos da classe e não propriedades.

[](./code-usage.ts ':include :type=code typescript')


## Lista com os nomes dos hooks internos

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

## Para outros nomes

Se o seu hook não está listado acima, você pode utilizar o decorator `Hook`. 

> ex: Hooks do `vue-router`.

[](./code-for-other-names.ts ':include :type=code typescript')

