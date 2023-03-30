import { Component, Vue, Use } from 'vue-facing-decorator'
import { ref } from 'vue'
import { useRouter, Router } from 'vue-router'

@Component
class MyComponent extends Vue {

    @Use(useRouter)
    router!: Router

    mounted() {
        console.log(this.router)
    }
}

@Component
class MyComponent2 extends Vue {

    @Use(() => ref('hello world'))
    data!: string

    mounted() {
        console.log(this.data)
    }
}