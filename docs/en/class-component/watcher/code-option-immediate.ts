
import { Watch, Component, Vue, toNative } from 'vue-facing-decorator'

/*

Vue options API
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
            immediate:true
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    property = "value"

    @Watch("property", {
        immediate: true
    })
    propertyWatcher(newValue: string, oldValue: string) {

    }
}

export default toNative(MyComponent)