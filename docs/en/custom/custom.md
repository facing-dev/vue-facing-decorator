## Usage

Use `createDecorator` to build your own decorators. 

If you are a package author, install vue-facing-decorator as `devDependecies` and mark it in `peerDependencies`.

`createDecorator` receives a creator function, which accepts two parameters: 
1. Generated vue options component, you can modify it to implement anything you want.
2. The key of class property(or method) which decorator decorated.

and an optional config object.

[](./code-usage.ts ':include :type=code typescript')

## Options

### `preserve`

Use this option to indicate whether the decorated value should be preserved before decorator applied or not.

[](./code-usage.ts ':include :type=code typescript')

If we set `preserve` to `false` in the above code, we can't access origin `method` in `methods`.