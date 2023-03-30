
import { Ref, Component, Vue } from 'vue-facing-decorator'

/*

<template>
    <div ref="refEl"></div>
</template>

*/

@Component
export default class MyComponent extends Vue {
    @Ref
    readonly refEl!: HTMLDivElement
}
