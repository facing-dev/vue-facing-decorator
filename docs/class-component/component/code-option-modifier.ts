
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
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
class MyComponent extends Vue {

}
