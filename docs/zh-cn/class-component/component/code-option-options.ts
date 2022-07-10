import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
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
