
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component
class MyAnotherComponent extends Vue {

}

/*
Vue options component
{
    components:{
        MyAnotherComponent
    }
}
*/

@Component({
    components: {
        MyAnotherComponent
    }
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)