
import { Component, Vue } from 'vue-facing-decorator'

/*
Componente Vue com options API
{
    expose:['name']
}
*/

@Component({
    expose: ['Name']
})
export default class MyComponent extends Vue {

}
