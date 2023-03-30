
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
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
