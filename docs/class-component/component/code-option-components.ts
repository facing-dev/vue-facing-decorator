
import { Component, Vue } from 'vue-facing-decorator'

@Component
class MyAnotherComponent extends Vue {

}

/*
Vue option component
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


