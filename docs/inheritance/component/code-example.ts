
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    name:"MyComponent"
    extends:{
        name:"SuperComponent"
    }
}
*/
@Component({
    name: "SuperComponent"
})
class SuperComponent extends Vue {

}

@Component({
    name: "MyComponent"
})
export default class MyComponent extends SuperComponent {

}
