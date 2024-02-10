
import { Inject, Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    inject:{
        nameAlias:{
            from:'name'
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Inject({
        from: 'name'
    })
    readonly nameAlias!: string
}

export default toNative(MyComponent)