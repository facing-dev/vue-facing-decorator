
import { Prop, Component, Vue } from 'vue-facing-decorator'

/*

Vue option component
{
    props:{
        p:{
            
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Prop
    p!: string
}
