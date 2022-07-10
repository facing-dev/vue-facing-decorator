
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    directives:{
        MyDirective:{}
    }
}
*/

@Component({
    directives: {
        MyDirective: {}
    }
})
export default class MyComponent extends Vue {

}
