## Usage

To make enable TSX attribute types:

1. Import `TSX` function from this repo.

2. Define an interface(e.g. `Props`) to decribe properties in component.

3. Define an interface(e.g. `Events`) to decribe events in component.

4. Make component extend from `TSX<Props,Events>()(BaseComponent)`.

>   The keys of `Events` will be capitalized and prefixed by `on`. e.g. `myEvent` => `onMyEvent`.

> There are two `()`s after `TSX<Props,Events>`.

[](./code-usage.tsx ':include :type=code tsx')

## Property types checking in component

We could check if component implements properties by `implements`.

[](./code-type-checking.tsx ':include :type=code tsx')

## Component inheritance

TSX attributes supports component inheritance.

[](./code-component-inheritance.tsx ':include :type=code tsx')



