
import { Prop, Component, Vue, toNative } from 'vue-facing-decorator'

/*

Vue options API
{
    props:{
        p:{
            default: 'foo'
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Prop({
        default: 'foo'
    })
    p!: string
}

export default toNative(MyComponent)