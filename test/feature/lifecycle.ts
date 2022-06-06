
import { expect } from 'chai';
import 'mocha';
import { Component, Ref, Base } from '../../dist'

@Component
export class Comp extends Base {
    mounted(){
        return 'mounted test value'
    }

}
const CompContext = Comp as any

describe('feature lifecycle',
    () => {
        it('default', () => {
            expect('undefined').to.equal(typeof CompContext?.methods?.mounted)
            expect('function').to.equal(typeof CompContext?.mounted)
            expect('mounted test value').to.equal(CompContext?.mounted())
        })
    }
)
export default {}