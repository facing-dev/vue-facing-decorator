
import { mount } from '@vue/test-utils'
import { expect } from 'chai';
import 'mocha';
import { Component, Base ,Vanilla} from '../../dist'

@Component
export class Comp extends Base {

    @Vanilla
    get getData() {
        return 'computedData value'
    }

    @Vanilla
    set setData(v: any) {

    }

}

const CompContext = Comp as any


describe('decorator computed',
    () => {
        const wrapper = mount(CompContext)
        const vm = wrapper.vm
        it('default', () => {
            expect('function').to.equal(typeof Object.getOwnPropertyDescriptor(vm,'getData')!.get)
            expect('function').to.equal(typeof Object.getOwnPropertyDescriptor(vm,'setData')!.set)
     
        })
    }
)

export default {}
