
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component({
    name: "MyComponent"
})
class MyComponent extends Vue {

}

/*
Cast to vue options API by toNative
{
    name:"MyComponent"
}
*/

export default toNative(MyComponent)

export { MyComponent }

/*
import MyComponent from 'MyComponent.vue'

@Component({
    components:[MyComponent] // use it as a component of another component
})


//or


import { createApp } from 'vue'
import MyComponent from 'MyComponent.vue'

createApp(MyComponent).mount('#root') // or other places which vue want an options API component
*/

/*
import { Component, Vue, toNative } from 'vue-facing-decorator'
import { MyComponent } from 'MyComponent.vue'

// Extends component constructor directly

@Component
class AnotherComponent extends MyComponent {

}

*/