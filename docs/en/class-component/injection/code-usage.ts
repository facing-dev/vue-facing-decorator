
import { Inject, Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    inject:{
        name:{}
    }
}
*/

@Component
class MyComponent extends Vue {
    @Inject
    readonly name!: string
}

export default toNative(MyComponent)