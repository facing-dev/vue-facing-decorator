
import { expect } from 'chai';
import 'mocha';
import { Component, Inject, Base, toNative } from '../../dist'
import { isEmptyObject } from '../utils'
@Component
class Comp extends Base {
    @Inject()
    readonly defaultInjectName!: any

    @Inject({
        from: "fullInjectNameAlias",
        default: true
    })
    readonly fullInjectName!: any

}
const CompContext = toNative(Comp) as any

describe('decorator Inject',
    () => {
        it('default', () => {
            expect('object').to.equal(typeof CompContext?.inject?.defaultInjectName)
            expect(true).to.equal(isEmptyObject(CompContext.inject.defaultInjectName))
        })
        it('full option', () => {
            expect('object').to.equal(typeof CompContext?.inject?.fullInjectName)

            expect('fullInjectNameAlias').to.equal(CompContext.inject.fullInjectName.from)
            expect(true).to.equal(CompContext.inject.fullInjectName.default)
        })
    }
)
export default {}