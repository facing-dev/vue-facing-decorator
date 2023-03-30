
import { Inject, Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    inject:{
        name:{}
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Inject
    readonly name!: string
}
