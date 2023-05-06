
import { expect } from 'chai';
import 'mocha';
import { Component, ComponentBase, Base ,toNative} from '../../dist'

class Comp1Sup extends Base {
    method1Sup() {
        return 'method1Sup value'
    }
}

@ComponentBase
class Comp1 extends Comp1Sup {
    method1Comp() {
        return 'method1Comp value'
    }
}

class Comp2Sup extends Comp1 {
    method2Sup() {
        return 'method2Sup value'
    }
}

@ComponentBase
class Comp2 extends Comp2Sup {
    method2Comp() {
        return 'method2Comp value'
    }
}

class Comp3Sup extends Comp2 {
    method3Sup() {
        return 'method3Sup value'
    }
}


@Component
class Comp3 extends Comp3Sup {
    method3Comp() {
        return 'method3Comp value'
    }
}

const Comp3Context = toNative(Comp3) as any

describe('feature extends',
    () => {
        const Comp2Context = Comp3Context.extends
        expect('object').to.equal(typeof Comp2Context)
        const Comp1Context = Comp2Context.extends
        expect('object').to.equal(typeof Comp1Context)
        expect('undefined').to.equal(typeof Comp1Context.extends)
        it('comp3', () => {
            expect('function').to.equal(typeof Comp3Context?.methods?.method3Comp)
            expect('method3Comp value').to.equal(Comp3Context.methods.method3Comp())
            expect('function').to.equal(typeof Comp3Context?.methods?.method3Sup)
            expect('method3Sup value').to.equal(Comp3Context.methods.method3Sup())
        })
        it('comp2', () => {
            expect('function').to.equal(typeof Comp2Context?.methods?.method2Comp)
            expect('method2Comp value').to.equal(Comp2Context.methods.method2Comp())
            expect('function').to.equal(typeof Comp2Context?.methods?.method2Sup)
            expect('method2Sup value').to.equal(Comp2Context.methods.method2Sup())
        })
        it('comp1', () => {
            expect('function').to.equal(typeof Comp1Context?.methods?.method1Comp)
            expect('method1Comp value').to.equal(Comp1Context.methods.method1Comp())
            expect('function').to.equal(typeof Comp1Context?.methods?.method1Sup)
            expect('method1Sup value').to.equal(Comp1Context.methods.method1Sup())
        })
    }
)


// import { defineComponent } from 'vue';
// export default defineComponent({
//     extends: {
//         extends: {
//             methods: {
//                 method1Comp() {
//                     return 'method1Comp value'
//                 }
//             }
//         },
//         method2Comp() {
//             return 'method2Comp value'
//         }
//     },
//     methods: {
//         method3Comp() {
//             return 'method3Comp value'
//         }
//     }
// })