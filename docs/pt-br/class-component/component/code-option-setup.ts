
import { Component, Vue } from 'vue-facing-decorator'

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
export default class MyComponent extends Vue {
    key!: string
}
