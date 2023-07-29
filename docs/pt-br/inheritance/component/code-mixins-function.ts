import { Component, ComponentBase, Vue, mixins } from 'vue-facing-decorator'

/*
Vue options API
{
    name:"MyComponent",
    extends:{
        mixins:[{
            name:'ComponentA'
        },{
            name:'ComponentB'
        }]
    }
}
*/
@ComponentBase({
    name: "ComponentA"
})
class ComponentA extends Vue {

}

@ComponentBase({
    name: "ComponentB"
})
class ComponentB extends Vue {

}

@Component({
    name: "MyComponent"
})
export default class MyComponent extends mixins(ComponentA,ComponentB) {

}
