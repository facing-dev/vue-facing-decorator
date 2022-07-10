
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options component
{
    expose:['name']
}
*/

@Component({
    expose: ['Name']
})
export default class MyComponent extends Vue {

}
