
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
            flush:"post"
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    property = "value"

    @Watch("property", {
        flush: "post"
    })
    propertyWatcher(newValue: string, oldValue: string) {

    }
}
