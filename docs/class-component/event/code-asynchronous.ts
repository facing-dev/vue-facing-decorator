
import { Emit, Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    methods:{
        async triggerAsyncEvent(){
            const value = await new Promise((resolver)=>{
                setTimeout(()=>{
                    resolver('value')
                },1000)
            })
            this.$emit('triggerAsyncEvent',value)
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Emit
    triggerAsyncEvent() {
        return new Promise((resolver) => {
            setTimeout(() => {
                resolver('value')
            }, 1000)
        })
    }
}
