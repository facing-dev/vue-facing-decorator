
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    emits:['MyEvent']
}
*/

@Component({
    emits: ['MyEvent']
})
export default class MyComponent extends Vue {

}
