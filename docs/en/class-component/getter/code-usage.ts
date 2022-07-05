
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    computed:{
        getter(){
            return 'value'
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    get getter() {
        return 'value'
    }
}
