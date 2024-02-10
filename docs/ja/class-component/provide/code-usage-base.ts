import { Component, Vue, Provide, toNative } from 'vue-facing-decorator'

@Component
class MyComponent extends Vue {
    @Provide
    p1 = 'foo'

    @Provide('alias')
    p2 = 'bar'
}


export default toNative(MyComponent)