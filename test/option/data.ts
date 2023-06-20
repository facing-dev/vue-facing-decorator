
import { expect } from 'chai';
import 'mocha';
import { Component, Base, Prop } from '../../dist'
import { mount } from '@vue/test-utils'

@Component
export class DataComp extends Base {
    data = 'data value'
    @Prop
    prop!: string
    fieldInitProp = this.prop

    methods = [this.method];
    options = {
        handler: this.method,
    }
    wrapped = () => this.method();

    method() {
        return this.data
    }
}

const CompContext = DataComp as any

describe('option data',
    () => {
        it('default', () => {
            const vm = mount(CompContext, {
                props: {
                    prop:'prop test'
                }
            }).vm

            expect('function').to.equal(typeof CompContext?.data)
            expect('data value').to.equal(CompContext.data().data)
            expect(5).to.equal(Object.keys(CompContext.data()).length)
            expect('prop test').to.equal(vm.fieldInitProp)
        })

        it('binds methods to the component context', () => {
            const {vm} = mount(CompContext)
            expect('data value').to.equal(vm.methods[0]())
            expect('data value').to.equal(vm.options.handler())
            expect('data value').to.equal(vm.wrapped())
        })
    }
)
export default {}
