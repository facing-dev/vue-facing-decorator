
import { expect } from 'chai';
import 'mocha';
import { Component, ComponentBase, Base, toNative } from '../../dist/esm'

@ComponentBase({
    name: 'ComponentBase'
})
class Sup extends Base {
    dataSup = 'dataSup value'
    methodSup() {
        return 'methodSup value'
    }
}

@Component
class Comp extends Sup {
    dataComp = 'dataComp value'
    methodComp() {
        return 'methodComp value'
    }
}

const CompContext = toNative(Comp) as any
const SupContext = CompContext.extends
describe('feature component extends',
    () => {
        it('comp', () => {
            expect('function').to.equal(typeof CompContext?.data)
            const compData = CompContext.data()
            expect('dataComp value').to.equal(compData.dataComp)
            expect('function').to.equal(typeof CompContext?.methods?.methodComp)
            expect('methodComp value').to.equal(CompContext.methods.methodComp())




        })
        it('sup', () => {

            expect('object').to.equal(typeof SupContext)
            expect('function').to.equal(typeof SupContext?.data)
            const supData = SupContext.data()
            expect('dataSup value').to.equal(supData.dataSup)
            expect('function').to.equal(typeof SupContext?.methods?.methodSup)
            expect('methodSup value').to.equal(SupContext.methods.methodSup())
            expect('ComponentBase').to.equal(SupContext.name)
        })
    }
)
export default {}