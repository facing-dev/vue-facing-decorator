
import { Prop, Component, Vue } from 'vue-facing-decorator'

/*

Vue option component
{
    props:{
        p:{
            required:true
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Prop({
        required: true
    })
    p!: string
}
