
import { Prop, Component, Vue } from 'vue-facing-decorator'

/*

Vue option component
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
