
import { Watch, Component, Vue } from 'vue-facing-decorator'

/*

Vue option component
{
    data(){
        return {
            property:"value"
        }
    }

    watch:{
        property:{
            handler:function propertyWatcher(newValue: string, oldValue: string){

            }
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    property = "value"

    @Watch("property")
    propertyWatcher(newValue: string, oldValue: string) {

    }
}
