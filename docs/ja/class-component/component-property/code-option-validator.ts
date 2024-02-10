
import { Prop, Component, Vue, toNative } from 'vue-facing-decorator'

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
class MyComponent extends Vue {
    @Prop({
        validator(val: any) {
            return true
        }
    })
    p?: string
}

export default toNative(MyComponent)
