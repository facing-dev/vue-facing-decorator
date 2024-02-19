
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    render:function(){

    }
}
*/

@Component({
    render: function () {

    }
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)