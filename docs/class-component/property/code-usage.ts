
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
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
