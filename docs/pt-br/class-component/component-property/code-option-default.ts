
import { Prop, Component, Vue } from 'vue-facing-decorator'

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
export default class MyComponent extends Vue {
    @Prop({
        default: 'foo'
    })
    p!: string
}
