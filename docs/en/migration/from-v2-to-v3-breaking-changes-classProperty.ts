
import { Component, Vue, toNative, Prop } from 'vue-facing-decorator'

@Component({
    name: "MyComponent"
})
class MyComponent extends Vue {
    @Prop
    prop!: string

    field = this.prop // this is deprecated, it will be undefined
}


export default toNative(MyComponent)

export { MyComponent }