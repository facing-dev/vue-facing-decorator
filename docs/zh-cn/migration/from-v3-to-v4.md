## 破坏性改变
### 输出结构变化

* 输出ESM格式到dist/esm
* 输出CommonJS格式到dist/cjs

如果你使用已废弃的`vue-facing-decorator/dist/index-return-cons`并且你的TS配置`moduleResolution`为`Node16`，这将没有影响。否则你需要将路径改变为`vue-facing-decorator/dist/esm/index-return-cons`或`vue-facing-decorator/dist/cjs/index-return-cons`。