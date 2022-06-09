
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    provide:{
        key: 'value'
    }
}
*/

@Component({
    provide: {
        key: 'value'
    }
})
class MyComponent extends Vue {

}
