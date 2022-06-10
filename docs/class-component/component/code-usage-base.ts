import { Component, Vue } from 'vue-facing-decorator'
@Component
class MyComponent extends Vue {

}

//or

@Component({
    //Set your options here.
})
export default class MyComponentWithOptions extends Vue {

}