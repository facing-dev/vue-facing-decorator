## v2迁移到v3

从v2迁移到v3，会对你的项目进行一些破坏性改变。

在3.x中, 装饰器`Component`和装饰器`ComponentBase`相同，并且你需要手动将类组件转换为vue options API组件。具体内容如下：

## 破坏性改变

### 转换class component为vue options API组件

建议使用`toNative`将类组件转换为vue options API组件，转换后的组件可以被用在任何使用vue原生组件的地方。

[](../../en/migration/from-v2-to-v3-breaking-changes-toNative.ts ':include :type=code typescript')

### 不可在声明类组件属性时直接使用其他属性或方法

下面的代码不允许：

[](../../en/migration/from-v2-to-v3-breaking-changes-classProperty.ts ':include :type=code typescript')

### 移除`index-return-cons`

移除`vue-facing-decorator/dist/index-return-cons`，因为现在有`toNative`了。
