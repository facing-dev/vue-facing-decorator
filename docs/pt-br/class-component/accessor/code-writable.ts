
import { Component, Vue } from 'vue-facing-decorator'

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
export default class MyComponent extends Vue {
    foo = ''
    set setter(bar: string) {
        this.foo = bar
    }
}
