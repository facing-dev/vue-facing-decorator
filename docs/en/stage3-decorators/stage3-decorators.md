## Stage3 decorators

`vue-facing-decorator` could compatible with stage3 decorators, but some third libraries not supports it yet(e.g. `esbuild` which compiles typescript code in `.vue` files).

So it's recommended to keep use stage2 decorators in your project. But if you want to try the new one, follow this document.

## Configure

To enable stage3 decorators, you should:

1. Update your `typescript` to version 5.

2. Set `compilerOptions.experimentalDecorators` to `false`, this will enable stage 3 decorator.

## Important

You must use `toNative` to transform a class component into a vue options API component immediately.