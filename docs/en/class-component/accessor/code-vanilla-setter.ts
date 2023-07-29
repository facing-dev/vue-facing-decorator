
import { Component, Vue, Vanilla, toNative } from 'vue-facing-decorator'

@Component
class MyComponent extends Vue {
    foo = ''
    @Vanilla
    set setter(bar: string) {
        this.foo = bar
    }
}

export default toNative(MyComponent)