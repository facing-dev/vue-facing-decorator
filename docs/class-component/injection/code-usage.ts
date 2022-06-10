
import { Inject, Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
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
