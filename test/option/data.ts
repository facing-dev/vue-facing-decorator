
import { expect } from 'chai';
import 'mocha';
import { Component, Base, Prop, toNative } from '../../dist'
import { mount } from '@vue/test-utils'

@Component
class DataComp extends Base {
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
        return this.prop
    }
}

const CompContext = toNative(DataComp) as any

describe('option data',
    () => {
        it('default', () => {
            const vm = mount(CompContext, {
                props: {
                    prop: 'prop test'
                }
            }).vm

            expect('function').to.equal(typeof CompContext?.data)
            expect('data value').to.equal(vm.data)
            // expect('data value').to.equal(CompContext.data().mb)
            // expect(5).to.equal(Object.keys(CompContext.data()).length)
      

        })

        it('binds methods to the component context', () => {
            const { vm } = mount(CompContext, {
                props: {
                    prop: 'prop test'
                }
            })
            expect('prop test').to.equal(vm.methods[0]())
            expect('prop test').to.equal(vm.options.handler())
            expect('prop test').to.equal(vm.wrapped())
            expect('prop test').to.equal(vm.fieldInitProp)

        })
    }
)
export default {}
