## Stage3 装饰器

`vue-facing-decorator`对stage3装饰器兼容，但是一些第三方库目前还不支持(例如`esbuild`在编译 `.vue`文件时)。

因此目前建议在你的项目中仍然使用stage2装饰器。但是如果你想要尝试stage3装饰器，请看下面的文档。

## 配置

开启stage3装饰器，你需要：

1. 升级`typescript`到版本5。

2. 设置`compilerOptions.experimentalDecorators`为`false`，这会开启stage3装饰器。

## 重要

你必须使用`toNative`来将类组件转化为vue options API组件。