
import { Prop, Component, Vue } from 'vue-facing-decorator'

/*

Vue option component
{
    props:{
        p:{
            type: String
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Prop({
        type: String
    })
    p?: string
}
