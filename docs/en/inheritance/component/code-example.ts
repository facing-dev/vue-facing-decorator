
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    name:"MyComponent"
    extends:{
        name:"SuperComponent"
    }
}
*/
@Component({
    name: "SuperComponent"
})
class SuperComponent extends Vue {

}

@Component({
    name: "MyComponent"
})
class MyComponent extends SuperComponent {

}

export default toNative(MyComponent)