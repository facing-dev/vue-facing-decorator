
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { defineComponent } from 'vue'

const VueComponent = defineComponent({

})

@Component
class ClassComponent extends Vue {

}

/*
Vue options component
{
    mixins:[VueComponent, nativeClassComponent]
}
*/

@Component({
    mixins: [VueComponent, toNative(ClassComponent)]
})
class MyComponent extends Vue {

}

export default toNative(MyComponent)
