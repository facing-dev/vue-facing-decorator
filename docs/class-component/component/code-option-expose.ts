
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
class MyComponent extends Vue {

}
