
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

const VueNativeComponent = defineComponent({
    name: 'VueNativeComponent',
    methods: {
        nativeMethod() {
        }
    }
})

/*
Vue options API
{
    name:"MyComponent"
    mixins:[VueNativeComponent]
}
*/

interface VueNativeComponentContext {
    nativeMethod: () => void
}

@Component({
    name: "MyComponent",
    mixins: [VueNativeComponent]
})
class MyComponent extends Vue {
    get VueNativeComponentContext(): VueNativeComponentContext {
        return this as any
    }

    mounted() {
        this.VueNativeComponentContext.nativeMethod()
    }
}

export default toNative(MyComponent)
