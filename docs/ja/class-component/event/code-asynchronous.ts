
import { Emit, Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
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
class MyComponent extends Vue {
    @Emit
    triggerAsyncEvent() {
        return new Promise((resolver) => {
            setTimeout(() => {
                resolver('value')
            }, 1000)
        })
    }
}

export default toNative(MyComponent)
