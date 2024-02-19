
import { Inject, Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    inject:{
        name:{
            default:'default name'
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Inject({
        default: 'default name'
    })
    readonly name!: string
}

export default toNative(MyComponent)