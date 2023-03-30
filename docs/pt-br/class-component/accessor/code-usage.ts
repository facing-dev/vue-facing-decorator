
import { Component, Vue } from 'vue-facing-decorator'

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
export default class MyComponent extends Vue {
    get getter() {
        return 'value'
    }
}
