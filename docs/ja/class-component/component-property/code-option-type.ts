
import { Prop, Component, Vue, toNative } from 'vue-facing-decorator'

/*

Vue options API
{
    props:{
        p:{
            type: String
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Prop({
        type: String
    })
    p?: string
}

export default toNative(MyComponent)