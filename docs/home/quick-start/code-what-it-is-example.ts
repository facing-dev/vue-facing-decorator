import { Component, Vue } from 'vue-facing-decorator'
@Component
export default class MyComponent extends Vue {

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