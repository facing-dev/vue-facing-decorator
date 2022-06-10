
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

            },
            deep:true
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    property = "value"

    @Watch("property", {
        deep: true
    })
    propertyWatcher(newValue: string, oldValue: string) {

    }
}
