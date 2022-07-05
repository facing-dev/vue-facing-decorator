
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    inheritAttrs:true
}
*/

@Component({
    inheritAttrs: true
})
export default class MyComponent extends Vue {

}
