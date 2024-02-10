
import { Component, Vue, Vanilla, toNative } from 'vue-facing-decorator'

@Component
class MyComponent extends Vue {
    @Vanilla
    get getter() {
        return 'value'
    }
}

export default toNative(MyComponent)