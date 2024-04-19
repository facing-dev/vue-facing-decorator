
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options component
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
class MyComponent extends Vue {

}

export default toNative(MyComponent)