
import { Ref, Component, Vue } from 'vue-facing-decorator'

/*

<template>
    <div ref="refEl"></div>
</template>

Vue options API
{
    computed:{
        refEl(){
            return this.refs['refEl']
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Ref
    readonly refEl!: HTMLDivElement
}
