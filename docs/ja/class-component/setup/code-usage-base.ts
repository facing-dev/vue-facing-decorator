import { Component, Vue, Setup } from 'vue-facing-decorator'
import { ref } from 'vue'
import { useRouter, Router } from 'vue-router'

@Component
class MyComponent extends Vue {

    @Setup((props, ctx) => useRouter())
    router!: Router

    mounted() {
        console.log(this.router)
    }
}

@Component
class MyComponent2 extends Vue {

    @Setup(() => ref('hello world'))
    data!: string

    mounted() {
        console.log(this.data)
    }
}