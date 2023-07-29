
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options component
{
    emits:['MyEvent']
}
*/

@Component({
    emits: ['MyEvent']
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)