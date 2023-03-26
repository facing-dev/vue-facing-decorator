import { Component, Vue, setup } from 'vue-facing-decorator'
import { useRouter } from 'vue-router'

@Component
class MyComponent extends Vue {
    private router = setup(() => useRouter())

    mounted() {
        console.log(this.router.getRoutes())
    }
}