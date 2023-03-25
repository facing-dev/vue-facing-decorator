import ref from 'vue'
import { Component, Vue, setup } from 'vue-facing-decorator'

@Component({
    setup(props, ctx) {
        const message = ref('hello world')
        return { message }
    }
})
class MyComponent extends Vue {
    private data = setup(() => 'hello world') // This setup() function will no longer work!

    mounted() {
        console.log(this.message) // Undefined!
    }
}