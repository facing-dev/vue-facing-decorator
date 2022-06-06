
import { expect } from 'chai';
import 'mocha';
import { Component, Base } from '../../dist'

@Component
export class Comp extends Base {
    get computedData(){
        return 'computedData value'
    }

}
const CompContext = Comp as any

describe('decorator computed',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.computed?.computedData)
            expect('computedData value').to.equal(CompContext.computed.computedData())
        })
    }
)
export default {}