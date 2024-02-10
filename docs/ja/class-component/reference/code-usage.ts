
import { Ref, Component, Vue, toNative } from 'vue-facing-decorator'

/*

<template>
    <div ref="refEl"></div>
    <div ref="fooEl"></div>
</template>

*/

@Component
class MyComponent extends Vue {
    @Ref
    readonly refEl!: HTMLDivElement

    @Ref('fooEl')
    refEl2!: HTMLDivElement
}

export default toNative(MyComponent)