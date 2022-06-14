
import { expect } from 'chai';
import 'mocha';
import { Component, VModel, Base } from '../../dist'

@Component
export class Comp extends Base {

    @VModel
    defaultValueAgent!:string

    @VModel({
        name:'value',
        required:true
    })
    valueAgent!:string
}
const CompContext = Comp as any

describe('decorator Watch',
    () => {
        it('default', () => {
            expect('object').to.equal(typeof CompContext.props)
            expect(true).to.equal('modelValue' in CompContext.props)
            expect('object').to.equal(typeof CompContext.computed)
            expect(true).to.equal('defaultValueAgent' in CompContext.computed)
            expect('test').to.equal(CompContext.computed['defaultValueAgent'].get.apply({
                modelValue:'test'
            }))
            CompContext.computed['defaultValueAgent'].set.apply({
                $emit(name:string,value:any){
                    expect('update:modelValue').to.equal(name)
                    expect('test').to.equal(value)
                }
            },['test'])
        })
        it('value', () => {
            expect('object').to.equal(typeof CompContext.props)
            expect(true).to.equal('value' in CompContext.props)
            expect('object').to.equal(typeof CompContext.computed)
            expect(true).to.equal('valueAgent' in CompContext.computed)
            expect('test').to.equal(CompContext.computed['valueAgent'].get.apply({
                value:'test'
            }))
            CompContext.computed['valueAgent'].set.apply({
                $emit(name:string,value:any){
                    expect('update:value').to.equal(name)
                    expect('test').to.equal(value)
                }
            },['test'])
        })
    }
)
export default {}