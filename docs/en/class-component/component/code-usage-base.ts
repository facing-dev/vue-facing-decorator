import { Component, Vue, toNative } from 'vue-facing-decorator'
@Component
class MyComponent extends Vue {

}

//or

@Component({
    //Set your options here.
})
class MyComponentWithOptions extends Vue {

}

export default toNative(MyComponentWithOptions)