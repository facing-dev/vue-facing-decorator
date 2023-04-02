
import { expect } from 'chai';
import 'mocha';
import { Component, Base, toNative } from '../../dist'

@Component
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
        })
    }
)
export default {}