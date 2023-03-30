
import { Component, Vue } from 'vue-facing-decorator'

@Component
class MyAnotherComponent extends Vue {

}

/*
Componente Vue com options API
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
export default class MyComponent extends Vue {

}


