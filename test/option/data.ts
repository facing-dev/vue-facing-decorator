
import { expect } from 'chai';
import 'mocha';
import { Component, Ref, Base } from '../../dist'

@Component
export class Comp extends Base {
    data='data value'

}
const CompContext = Comp as any

describe('option data',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.data)
            expect('data value').to.equal(CompContext.data().data)
            expect(1).to.equal(Object.keys(CompContext.data()).length)
        })
    }
)
export default {}