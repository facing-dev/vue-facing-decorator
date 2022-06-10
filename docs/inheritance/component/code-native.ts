
import { Component, Vue } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

const VueNativeComponent = defineComponent({
    name: 'VueNativeComponent',
    methods: {
        nativeMethod() {
        }
    }
})

/*
Vue option component
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
