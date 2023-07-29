
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options component
{
    expose:['name']
}
*/

@Component({
    expose: ['Name']
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)