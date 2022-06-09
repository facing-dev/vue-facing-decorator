## Introduction

`vue-facing-decorator` provides abilities to build vue components with OOP classes and typescript decorators.

A sample example:

[](./code-what-it-is-example.ts ':include :type=code typescript')

## Installation

Install `vue-facing-decorator` with your favorite package manager.

```
npm install --save vue-facing-decorator
```

## How to use?

### Define a class component

A simplest class component must extends `Vue` base class and be decorated by `Component` from this repo.

[](./code-how-to-use-simplest-class-component.ts ':include :type=code typescript')


### In vue Single-File components

In common used vue Single-File components(`.vue` files), the default exported vue option component should be replaced by class component.

[](./code-how-to-use-sfc.vue ':include :type=code text')

> DO NOT USE composition api script `<script setup lang="ts">`.
