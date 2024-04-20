## 声明类组件属性时不要使用`this`上下文

当TS配置文件中`useDefineForClassFields`为`true`时，我们不能用`this`上下文来声明类组件的属性。

[](../../en/wellknown-issues/code-do-not-use-this.ts ':include :type=code typescript')

## 使用Vitest

如果你在使用测试框架出现错误时，尝试使用Vitest。

https://github.com/facing-dev/vue-facing-decorator/issues/54#issuecomment-1500019388

https://github.com/facing-dev/vue-facing-decorator/issues/33#issuecomment-1410648544

## 缺少IDE类型是吃

目前我们不能为IDE提供完整的类型支持。如果你需要目前尽可能多的类型支持，建议使用TSX作为渲染器。我们会持续加强类型支持。