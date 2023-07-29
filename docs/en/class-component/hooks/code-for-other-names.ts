
import { Component, Vue, Hook, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    myHook(){},
}
*/

@Component
class MyComponent extends Vue {
    @Hook
    myHook() { }
}

export default toNative(MyComponent)