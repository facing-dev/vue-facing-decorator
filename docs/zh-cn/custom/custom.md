## 用法

使用 `createDecorator` 构建你自己的装饰器. 

如果你是一位包作者，请将 vue-facing-decorator 安装到 `devDependecies` 中，并在 `peerDependencies` 中列出它。

`createDecorator` 接收一个函数，这个函数接收两个参数：
1. 生成的Vue options组件，你可以修改这个参数来实现你想实现的功能。
2. 装饰器所装饰的类属性（或方法）名。

和一个可选的配置对象。

[](../../en/custom/code-usage.ts ':include :type=code typescript')

## 选项

### `preserve`

使用这个选项来表示是否被装饰值要在装饰器起作用前被保留。

[](../../en/custom/code-usage.ts ':include :type=code typescript')

如果在上面代码中设置`preserve`为`false`， 我们将不能在`methods`访问`method`。