
import { Component, Vue, toNative, HookMounted } from 'vue-facing-decorator'

/*
Vue options API
{
    mounted(){
        
    }
}
*/

@Component
class MyComponent extends Vue implements HookMounted {
    mounted() {

    }
}

export default toNative(MyComponent)