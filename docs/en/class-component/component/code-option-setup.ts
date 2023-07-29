
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    setup() {
        return { key: 'value' }
    }
}
*/

@Component({
    setup() {
        return { key: 'value' }
    }
})
class MyComponent extends Vue {
    key!: string
}

export default toNative(MyComponent)