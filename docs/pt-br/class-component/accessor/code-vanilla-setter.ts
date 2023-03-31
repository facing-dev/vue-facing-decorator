
import { Component, Vue, Vanilla } from 'vue-facing-decorator'

@Component
export default class MyComponent extends Vue {
    foo = ''
    @Vanilla
    set setter(bar: string) {
        this.foo = bar
    }
}
