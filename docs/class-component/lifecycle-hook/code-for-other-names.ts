
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    hook1(){},
    hook2(){}
}
*/

@Component({
    options: {
        hook1() { }
    },
    modifier(option: any) {
        option.hook2 = function () { }
    }
})
class MyComponent extends Vue {

}
