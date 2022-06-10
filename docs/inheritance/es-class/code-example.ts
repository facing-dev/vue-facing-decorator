
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue option component
{
    data(){
        return {
            propertyA:'from Super',
            propertyB:'from MyComponent',
            property:'from MyComponent'
        }
    },
    methods:{
        methodA() {
            console.log('from Super')
        },
        methodB() {
            console.log('from MyComponent')
        },
        methodC() {
            super.methodC()
            console.log('from MyComponent')
        }
    }
}
*/

class Super extends Vue {
    propertyA = 'from Super'

    property = 'from Super'

    methodA() {
        console.log('from Super')
    }

    methodC() {
        console.log('from Super')
    }
}

@Component
class MyComponent extends Super {
    propertyB = 'from MyComponent'

    property = 'from MyComponent'

    methodB() {
        console.log('from MyComponent')
    }

    methodC() {
        super.methodC()
        console.log('from MyComponent')
    }
}
