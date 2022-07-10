
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    data(){
        return {
            property:'property value'
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    property = 'property value'
}
