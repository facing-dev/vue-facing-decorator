import { Component, Vue, toNative } from 'vue-facing-decorator'
@Component
class MyComponent extends Vue {

}

const nativeVueComponent = toNative(MyComponent)

import { createApp } from 'vue'

createApp(nativeVueComponent)