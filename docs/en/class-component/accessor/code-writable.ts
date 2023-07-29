
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    data(){
        return {
            foo:''
        }
    },
    computed:{
        set(bar){
            this.foo = bar
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    foo = ''
    set setter(bar: string) {
        this.foo = bar
    }
}

export default toNative(MyComponent)