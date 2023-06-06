
import { Inject, Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    inject:{
        name:{}
    }
}
*/

@Component
export default class MyComponent extends Vue {
    @Inject
    readonly name!: string
}

// Example of `provide` usage in any parent component

@Component({
  provide(this: MyParentComponent){
    return {
      name: computed(() => this.name),
    }
  }
})
export default class MyParentComponent extends Vue {
    name: string
}
