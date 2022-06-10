
import { Ref, Component, Vue } from 'vue-facing-decorator'

/*

<template>
    <div ref="refEl"></div>
</template>

Vue option component
{
    computed:{
        refEl(){
            return this.refs['refEl']
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Ref
    readonly refEl!: HTMLDivElement
}
