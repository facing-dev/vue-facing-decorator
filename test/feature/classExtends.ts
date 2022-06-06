
import { expect } from 'chai';
import 'mocha';
import { Component, Base } from '../../dist'
class Sup extends Base {
    dataSup = 'dataSup value'
    data = 'data-sup value'
    methodSup() {
        return 'methodSup value'
    }
    method() {
        return 'method-sup value'
    }
    mounted() {
        return 'mounted-sup value'
    }
}
@Component
export class Comp extends Sup {
    dataComp = 'dataComp value'
    data = 'data-comp value'
    methodComp() {
        return 'methodComp value'
    }
    method() {
        return 'method-comp value'
    }
    mounted() {
        return 'mounted-comp value'
    }
}
const CompContext = Comp as any

describe('feature class extends',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.methods?.method)
            expect('method-comp value').to.equal(CompContext.methods.method())
            expect('function').to.equal(typeof CompContext?.methods?.methodComp)
            expect('methodComp value').to.equal(CompContext.methods.methodComp())
            expect('function').to.equal(typeof CompContext?.methods?.methodSup)
            expect('methodSup value').to.equal(CompContext.methods.methodSup())
            expect('function').to.equal(typeof CompContext?.data)
            const data = CompContext.data()
            expect('data-comp value').to.equal(data.data)
            expect('dataComp value').to.equal(data.dataComp)
            expect('dataSup value').to.equal(data.dataSup)
            expect('function').to.equal(typeof CompContext?.mounted)
            expect('mounted-comp value').to.equal(CompContext.mounted())
        })
    }
)
export default {}