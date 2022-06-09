import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    name:'VueComponentName'
}
*/

@Component({
    options: {
        name: 'VueComponentName'
    }
})
class MyComponent extends Vue {

}
