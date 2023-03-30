
import { Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    data(){
        return {
            propertyA:'do componente Super',
            propertyB:'do componente MyComponent',
            property:'do componente MyComponent'
        }
    },
    methods:{
        methodA() {
            console.log('do componente Super')
        },
        methodB() {
            console.log('do componente MyComponent')
        },
        methodC() {
            super.methodC()
            console.log('do componente MyComponent')
        }
    }
}
*/

class Super extends Vue {
    propertyA = 'do componente Super'

    property = 'do componente Super'

    methodA() {
        console.log('do componente Super')
    }

    methodC() {
        console.log('do componente Super')
    }
}

@Component
export default class MyComponent extends Super {
    propertyB = 'do componente MyComponent'

    property = 'do componente MyComponent'

    methodB() {
        console.log('do componente MyComponent')
    }

    methodC() {
        super.methodC()
        console.log('do componente MyComponent')
    }
}
