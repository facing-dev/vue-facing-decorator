
import { expect } from 'chai';
import 'mocha';
import { Component, Base, toNative } from '../../dist/esm'

@Component({
    methods: {
        optionTest: () => 'option value'
    }
})
class Comp extends Base {
    method() {
        return 'method value'
    }
}
const CompContext = toNative(Comp) as any

describe('option methods',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.methods?.method)
            expect('method value').to.equal(CompContext.methods.method())
            expect('function').to.equal(typeof CompContext?.methods?.optionTest)
            expect('option value').to.equal(CompContext.methods.optionTest())
        })
    }
)
export default {}
