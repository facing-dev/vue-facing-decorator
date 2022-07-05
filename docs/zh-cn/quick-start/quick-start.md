## 介绍

`vue-facing-decorator` 提供面向对象类和TypeScript装饰器的方式来写vue组件。

简单例子:

[](./code-what-it-is-example.ts ':include :type=code typescript')

## 安装

使用你喜欢的包管理器来安装`vue-facing-decorator`。

```
npm install --save vue-facing-decorator
```

在项目根目录中的`tsconfig.json`中开启`experimentalDecorators`。

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

## 如何使用?

### 定义一个类组件

类组件必须继承这个项目的`Vue`基类并且应用这个项目的`Component`装饰器。

[](./code-how-to-use-simplest-class-component.ts ':include :type=code typescript')


### 在vue SFC中使用

在SFC中(`.vue` 文件)，使用类组件作为默认导出的内容。

[](./code-how-to-use-sfc.vue ':include :type=code text')

> ！！！不要使用 composition api `<script setup lang="ts">`。

### 分割文件和TSX

如果你不想使用SFC，你还可以在`.ts`文件中定义组件并且在`.tsx`文件中定义模板，然后组合他们。

> 像往常一样在通过webpack来管理CSS样式。

[](./code-separated-files-tsx/Comp.render.tsx ':include :type=code tsx')

[](./code-separated-files-tsx/Comp.ts ':include :type=code typescript')

[](./code-separated-files-tsx/style.css ':include :type=code css')
