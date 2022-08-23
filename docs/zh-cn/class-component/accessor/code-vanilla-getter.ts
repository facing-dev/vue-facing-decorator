
import { Component, Vue, Vanilla } from 'vue-facing-decorator'

@Component
export default class MyComponent extends Vue {
    @Vanilla
    get getter() {
        return 'value'
    }
}
