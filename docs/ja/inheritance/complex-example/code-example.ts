import { Component, Vue, toNative } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

const VueNativeComponent = defineComponent({
    name: 'VueNativeComponent',
})

class SuperCompSuper extends Vue {

}

@Component
class SuperComp extends SuperCompSuper {

}

class CompSuper extends SuperComp {

}

@Component({
    mixins: [VueNativeComponent]
})
class Comp extends CompSuper {

}

export default toNative(Comp)

/*
Vue options API
{//this is Comp
    extends:{//this is SuperComp

    },
    mixins:[VueNativeComponent]
}
*/