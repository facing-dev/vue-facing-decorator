
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options component
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

export default toNative(MyComponent)