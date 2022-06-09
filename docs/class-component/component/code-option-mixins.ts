
import { Component, Vue } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

const VueComponent = defineComponent({

})

/*
Vue option component
{
    mixins:[VueComponent]
}
*/

@Component({
    mixins: [VueComponent]
})
class MyComponent extends Vue {

}
