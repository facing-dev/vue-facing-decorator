
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
export default class MyComponent extends Vue {

}
