import { Component, Vue, toNative } from 'vue-facing-decorator'
@Component
class MyComponent extends Vue {

}

export default toNative(MyComponent)