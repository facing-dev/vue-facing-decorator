## Usage

To make enable TSX attribute types:

1. Import `TSX` function from this repo.

2. Define an interface(i.e. `Props`) to decribe properties in component.

3. Make your component extend from `TSX<Props>()(BaseComponent)`.

> There are two `()`s after `TSX<Props>`.

[](./code-usage.tsx ':include :type=code tsx')

## Type checking

We could check if component implements properties by `implements`.

[](./code-type-checking.tsx ':include :type=code tsx')

## Component inheritance

TSX attributes supports component inheritance.

[](./code-component-inheritance.tsx ':include :type=code tsx')



