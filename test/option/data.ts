
import { expect } from 'chai';
import 'mocha';
import { Component, Base, Prop, toNative } from '../../dist'
import { mount } from '@vue/test-utils'

@Component
class Comp extends Base {
    // constructor(a:any,b:any){
    //     super(a,b)
    //     console.log("be",(global as any).kkk===this)
    // }
    data = 'data value'
    @Prop
    prop!: string
    // fieldInitProp = this.prop //not work
}

const CompContext = toNative(Comp) as any

describe('option data',
    () => {
        it('default', () => {
            const vm = mount(CompContext, {
                props: {
                    prop: 'prop test'
                }
            }).vm

            expect('function').to.equal(typeof CompContext?.data)
            expect('data value').to.equal(CompContext.data().data)
            expect(1).to.equal(Object.keys(CompContext.data()).length)
            // expect('prop test').to.equal(vm.fieldInitProp)
        })
    }
)
export default {}