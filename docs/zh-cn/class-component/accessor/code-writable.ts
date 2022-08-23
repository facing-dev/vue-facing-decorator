
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    computed:{
        set(){
            return 'value'
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
