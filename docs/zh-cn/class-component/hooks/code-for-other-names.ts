
import { Component, Vue, Hook } from 'vue-facing-decorator'

/*
Vue options API
{
    myHook(){},
}
*/

@Component
export default class MyComponent extends Vue {
    @Hook
    myHook() { }
}
