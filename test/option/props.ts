
import { expect } from 'chai';
import 'mocha';
import { Component, Prop, Base, toNative } from '../../dist/esm'
import { isEmptyObject } from '../utils'
function Full_validator() {
    return true
}
@Component
class Comp extends Base {
    @Prop
    readonly propName!: any

    @Prop({
        type: Boolean,
        required: true,
        default: true,
        validator: Full_validator
    })
    readonly fullPropName!: any

}
const CompContext = toNative(Comp) as any

describe('decorator Prop',
    () => {
        it('default', () => {
            expect('object').to.equal(typeof CompContext?.props?.propName)
            expect(true).to.equal(isEmptyObject(CompContext.props.propName))
        })
        it('full option', () => {
            expect('object').to.equal(typeof CompContext?.props?.fullPropName)
            expect(Boolean).to.equal(CompContext.props.fullPropName.type)
            expect(true).to.equal(CompContext.props.fullPropName.required)
            expect(true).to.equal(CompContext.props.fullPropName.default)
            expect(Full_validator).to.equal(CompContext.props.fullPropName.validator)
        })
    }
)
export default {}