
import { Prop, Component, Vue, toNative } from 'vue-facing-decorator'

/*

Vue options API
{
    props:{
        p:{
            
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Prop
    p?: string
}

export default toNative(MyComponent)
