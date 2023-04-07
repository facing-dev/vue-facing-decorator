## Usage

Use `createDecorator` to build your own decorators. 

If you are a package author, install vue-facing-decorator as `devDependecies` and mark it in `peerDependencies`.

`createDecorator` received a creator function, which accepts tow parameters: 
1. Generated vue options component, you can modify it to implement anything you want.
2. The key of class property(or method) which decorator decorated.

[](./code-usage.ts ':include :type=code typescript')
