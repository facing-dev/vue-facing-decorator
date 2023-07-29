
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    computed:{
        get(){
            return 'value'
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    get getter() {
        return 'value'
    }
}

export default toNative(MyComponent)
