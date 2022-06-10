import { Component, ComponentBase, Vue } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

const VueNativeComponent = defineComponent({
    name: 'VueNativeComponent',
})

class SuperCompSuper extends Vue {

}

@ComponentBase
class SuperComp extends SuperCompSuper {

}

class CompSuper extends SuperComp {

}

@Component({
    mixins: [VueNativeComponent]
})
export class Comp extends CompSuper {

}

/*
Vue option component
{//this is Comp
    extends:{//this is SuperComp

    },
    mixins:[VueNativeComponent]
}
*/