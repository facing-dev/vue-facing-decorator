
import { expect } from 'chai';
import 'mocha';
import { Component, Base, Hook, toNative } from '../../dist'

@Component
class Comp extends Base {
    mounted() {
        return 'mounted test value'
    }
    @Hook
    testHook() {
        return 'testHook test value'
    }

}
const CompContext = toNative(Comp) as any

describe('feature hooks',
    () => {
        it('default', () => {
            expect('undefined').to.equal(typeof CompContext?.methods?.mounted)
            expect('function').to.equal(typeof CompContext?.mounted)
            expect('mounted test value').to.equal(CompContext?.mounted())

            expect('undefined').to.equal(typeof CompContext?.methods?.testHook)
            expect('function').to.equal(typeof CompContext?.testHook)
            expect('testHook test value').to.equal(CompContext?.testHook())
        })
    }
)
export default {}