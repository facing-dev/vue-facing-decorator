
import { Component, Vue } from 'vue-facing-decorator'

/*
Componente Vue com options API
{
    methods:{
        customMethod(){
            
        }
    }
}
*/

@Component({
    modifier: function (option: any) {
        option.methods ??= {}
        option.methods.customMethod = function () { }
    }
})
export default class MyComponent extends Vue {

}
