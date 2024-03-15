
import { expect } from 'chai';
import 'mocha';
import { Component, ComponentBase, Vue, mixins, toNative } from '../../dist/esm'

@ComponentBase
class A extends Vue {
    methodA() {
        return 'methodAValue'
    }
}

@ComponentBase
class B extends Vue {

    methodB() {
        return 'methodBValue'
    }
}

@Component
class Comp extends mixins(A, B) {

}

const CompContext = toNative(Comp) as any



describe('mixins function',
    () => {
        it('default', () => {
            expect('object').to.equal(typeof CompContext.extends)
            expect(true).to.equal(Array.isArray(CompContext.extends.mixins))
            expect('function').to.equal(typeof CompContext.extends.mixins[0].methods.methodA)
            expect('methodAValue').to.equal(CompContext.extends.mixins[0].methods.methodA())
            expect('function').to.equal(typeof CompContext.extends.mixins[0].methods.methodA)
            expect('methodBValue').to.equal(CompContext.extends.mixins[1].methods.methodB())
        })
    }
)
export default {}