
import { Ref, Component, Vue, toNative } from 'vue-facing-decorator'

/*

<template>
    <div ref="refEl"></div>
</template>

*/

@Component
class MyComponent extends Vue {
    @Ref
    readonly refEl!: HTMLDivElement
}

export default toNative(MyComponent)