import { Component, Vue, mixins, toNative } from 'vue-facing-decorator'

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
@Component({
    name: "ComponentA"
})
class ComponentA extends Vue {

}

@Component({
    name: "ComponentB"
})
class ComponentB extends Vue {

}

@Component({
    name: "MyComponent"
})
class MyComponent extends mixins(ComponentA, ComponentB) {

}

export default toNative(MyComponent)