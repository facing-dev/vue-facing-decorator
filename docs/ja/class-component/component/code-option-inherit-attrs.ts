
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options component
{
    inheritAttrs:true
}
*/

@Component({
    inheritAttrs: true
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)