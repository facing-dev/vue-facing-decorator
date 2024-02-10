
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    methods:{
        method(){
            
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    method() {

    }
}

export default toNative(MyComponent)