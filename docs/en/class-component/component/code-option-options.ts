import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    name:'VueComponentName'
}
*/

@Component({
    options: {
        name: 'VueComponentName'
    }
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)