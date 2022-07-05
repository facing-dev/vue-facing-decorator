
import { Inject, Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    inject:{
        name:{
            default:'default name'
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Inject({
        default: 'default name'
    })
    readonly name!: string
}
