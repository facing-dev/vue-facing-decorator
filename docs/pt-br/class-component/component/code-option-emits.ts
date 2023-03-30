
import { Component, Vue } from 'vue-facing-decorator'

/*
Componente Vue com options API
{
    emits:['MyEvent']
}
*/

@Component({
    emits: ['MyEvent']
})
export default class MyComponent extends Vue {

}
