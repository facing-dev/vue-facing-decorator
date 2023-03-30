
import { Prop, Component, Vue } from 'vue-facing-decorator'

/*

Vue options API
{
    props:{
        p:{
             validator(val:any){
                return true
            }
        }
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Prop({
        validator(val:any){
            return true
        }
    })
    p?: string
}
