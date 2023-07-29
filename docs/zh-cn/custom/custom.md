## 用法

使用 `createDecorator` 构建你自己的装饰器. 

如果你是一位包作者，请将 vue-facing-decorator 安装到 `devDependecies` 中，并在 `peerDependencies` 中列出它。

`createDecorator` 接收一个函数，这个函数接收两个参数：
1. 生成的Vue options组件，你可以修改这个参数来实现你想实现的功能。
2. 装饰器所装饰的类属性（或方法）名。

[](../../en/custom/code-usage.ts ':include :type=code typescript')
