import { Component, Vue, toNative } from 'vue-facing-decorator'
@Component
class MyComponent extends Vue {

    //This is a vue reactive property.
    text = 'Example code'

    //This is a vue component method.
    method() {
        console.log(this.text)
    }

    //This is a vue component lifecycle hook.
    mounted() {
        this.method()
    }
}

//Transform class component to vue native component
export default toNative(MyComponent)