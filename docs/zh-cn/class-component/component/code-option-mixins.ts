
import { Component, Vue } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

const VueComponent = defineComponent({

})

/*
Vue options API
{
    mixins:[VueComponent]
}
*/

@Component({
    mixins: [VueComponent]
})
export default class MyComponent extends Vue {

}
