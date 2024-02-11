
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    mounted(){
        
    }
}
*/

@Component
class MyComponent extends Vue {
    mounted() {

    }
}

export default toNative(MyComponent)