
import { Emit, Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    methods:{
        triggerMethodNameEvent(){
            this.$emit('triggerMethodNameEvent','triggerMethodNameEvent value')
        },
        triggerSpecifiedNameEvent(){
            this.$emit('SpecifiedName','triggerSpecifiedNameEvent value')
        }
    }
}
*/

@Component
class MyComponent extends Vue {
    @Emit
    triggerMethodNameEvent() {
        return 'triggerMethodNameEvent value'
    }

    @Emit('SpecifiedName')
    triggerSpecifiedNameEvent() {
        return 'triggerSpecifiedNameEvent value'
    }
}

export default toNative(MyComponent)