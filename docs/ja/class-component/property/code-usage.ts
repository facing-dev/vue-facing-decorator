
import { Component, Vue, toNative } from 'vue-facing-decorator'

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
class MyComponent extends Vue {
    property = 'property value'
}

export default toNative(MyComponent)