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
export default class MyComponent extends Vue {

}
