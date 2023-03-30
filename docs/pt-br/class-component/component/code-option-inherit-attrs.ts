
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options component
{
    inheritAttrs:true
}
*/

@Component({
    inheritAttrs: true
})
export default class MyComponent extends Vue {

}
