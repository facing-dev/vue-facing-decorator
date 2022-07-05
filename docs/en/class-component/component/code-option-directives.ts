
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
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
