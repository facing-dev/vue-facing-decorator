
import { Prop, Component, Vue, toNative } from 'vue-facing-decorator'

/*

Vue options API
{
    props:{
        p:{
            required:true
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Prop({
        required: true
    })
    p!: string
}

export default toNative(MyComponent)