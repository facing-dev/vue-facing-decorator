
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    template:'<div>template</div>'
}
*/

@Component({
    template: '<div>template</div>'
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)