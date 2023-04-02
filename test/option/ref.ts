
import { expect } from 'chai';
import 'mocha';
import { Component, Ref, Base, toNative } from '../../dist'

@Component
class Comp extends Base {
    @Ref
    readonly refName!: any

}
const CompContext = toNative(Comp) as any

describe('decorator Ref',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.beforeCreate)
        })
    }
)

export default {}