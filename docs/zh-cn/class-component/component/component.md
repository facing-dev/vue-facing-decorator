## 用法

使用装饰器 `Component` 来装饰一个类，这个类需要继承`Vue`基类。

[](../../../en/class-component/component/code-usage-base.ts ':include :type=code typescript')

## 选项

### name

和vue option api中的`name`相同.

[](../../../en/class-component/component/code-option-name.ts ':include :type=code typescript')

### emits

和vue option api中的`emits` in vue options API.

[](../../../en/class-component/component/code-option-emits.ts ':include :type=code typescript')

### provide

和vue option api中的`provide`相同。

[](../../../en/class-component/component/code-option-provide.ts ':include :type=code typescript')

### components

和vue option api中的`components`相同。

[](../../../en/class-component/component/code-option-components.ts ':include :type=code typescript')

### directives

和vue option api中的`directives`相同。

[](../../../en/class-component/component/code-option-directives.ts ':include :type=code typescript')

### inheritAttrs

和vue option api中的`inheritAttrs`相同。

[](../../../en/class-component/component/code-option-inherit-attrs.ts ':include :type=code typescript')

### expose

和vue option api中的`expose`相同。

[](../../../en/class-component/component/code-option-expose.ts ':include :type=code typescript')

### render

和vue option api中的`render`相同。

如果你使用SFC。render会被自动设置到`export default`导出的组件上。

> 这个选项会覆盖类中的render方法。

[](../../../en/class-component/component/code-option-render.ts ':include :type=code typescript')

### setup

和vue option api中的`setup`相同, 但是不能返回render函数。

[](../../../en/class-component/component/code-option-setup.ts ':include :type=code typescript')

### template

和vue option api中的`template`相同。

> 如果使用这个功能，需要使用包含模板编译器的完整vue版本。

[](../../../en/class-component/component/code-option-template.ts ':include :type=code typescript')

### mixins

和vue option api中的`mixins`相同。仅支持原生VUE组件（如果你想传入类组件，使用`toNative`转化它）。

[](../../../en/class-component/component/code-option-mixins.ts ':include :type=code typescript')

### methods

会被合并进vue option api中的`methods`。

[](../../../en/class-component/component/code-option-methods.ts ':include :type=code typescript')

### options

其中的数据会在`modifier`执行前被赋值到vue option组件上。

> 这是`vue-facing-decorator`提供的选项，不属于vue option api。

[](../../../en/class-component/component/code-option-options.ts ':include :type=code typescript')

### modifier

最后，我们可以使用这个函数来直接修改生成的vue option组件。

> 这是`vue-facing-decorator`提供的选项，不属于vue option api。

[](../../../en/class-component/component/code-option-modifier.ts ':include :type=code typescript')
