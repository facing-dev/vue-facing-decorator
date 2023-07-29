
import { expect } from 'chai';
import 'mocha';
import { Component, Model, Base, toNative } from '../../dist'

@Component
class Comp extends Base {

    @Model
    defaultValueAgent!: string

    @Model({
        name: 'value',
        required: true
    })
    valueAgent!: string
}
const CompContext = toNative(Comp) as any

describe('decorator VModal',
    () => {
        it('default', () => {
            expect('object').to.equal(typeof CompContext.props)
            expect(true).to.equal('modelValue' in CompContext.props)
            expect('object').to.equal(typeof CompContext.computed)
            expect(true).to.equal('defaultValueAgent' in CompContext.computed)
            expect('test').to.equal(CompContext.computed['defaultValueAgent'].get.apply({
                modelValue: 'test'
            }))

            expect(true).to.equal(CompContext.emits.includes('update:modelValue'))
            CompContext.computed['defaultValueAgent'].set.apply({
                $emit(name: string, value: any) {
                    expect('update:modelValue').to.equal(name)
                    expect('test').to.equal(value)
                }
            }, ['test'])
        })
        it('value', () => {
            expect('object').to.equal(typeof CompContext.props)
            expect(true).to.equal('value' in CompContext.props)
            expect('object').to.equal(typeof CompContext.computed)
            expect(true).to.equal('valueAgent' in CompContext.computed)
            expect('test').to.equal(CompContext.computed['valueAgent'].get.apply({
                value: 'test'
            }))
            expect(true).to.equal(CompContext.emits.includes('update:value'))
            CompContext.computed['valueAgent'].set.apply({
                $emit(name: string, value: any) {
                    expect('update:value').to.equal(name)
                    expect('test').to.equal(value)
                }
            }, ['test'])
        })
    }
)
export default {}