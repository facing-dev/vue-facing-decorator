
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    expose:['name']
}
*/

@Component({
    expose: ['Name']
})
export default class MyComponent extends Vue {

}
