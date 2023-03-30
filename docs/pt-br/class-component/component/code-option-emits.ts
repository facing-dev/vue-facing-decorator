
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options component
{
    emits:['MyEvent']
}
*/

@Component({
    emits: ['MyEvent']
})
export default class MyComponent extends Vue {

}
