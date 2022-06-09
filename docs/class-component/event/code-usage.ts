
import { Emit, Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
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
    triggerMethodNameEvent(){
        return 'triggerMethodNameEvent value'
    }

    @Emit('SpecifiedName')
    triggerSpecifiedNameEvent(){
        return 'triggerSpecifiedNameEvent value'
    }
}
