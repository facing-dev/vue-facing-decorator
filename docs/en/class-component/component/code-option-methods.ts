
import { Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options component
{
    methods:{
        foo(){
            
        }
    }
}
*/

@Component({
    methods: {
        foo() {

        }
    }
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)
