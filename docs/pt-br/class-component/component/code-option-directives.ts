
import { Component, Vue } from 'vue-facing-decorator'

/*
Componente Vue com options API
{
    directives:{
        MyDirective:{}
    }
}
*/

@Component({
    directives: {
        MyDirective: {}
    }
})
export default class MyComponent extends Vue {

}
