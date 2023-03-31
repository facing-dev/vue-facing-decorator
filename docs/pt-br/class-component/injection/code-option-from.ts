
import { Inject, Component, Vue } from 'vue-facing-decorator'

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
export default class MyComponent extends Vue {
    @Inject({
        from:'name'
    })
    readonly nameAlias!: string
}
