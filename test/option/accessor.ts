
import { mount } from '@vue/test-utils'
import { expect } from 'chai';
import 'mocha';
import { Component, Base, Vanilla, toNative } from '../../dist/esm'

@Component({template: '<div/>'})
class Comp extends Base {

    @Vanilla
    get getData() {
        return 'computedData value'
    }

    @Vanilla
    set setData(v: any) {

    }

}

const CompContext = toNative(Comp) as any


describe('decorator accessor',
    () => {
        const wrapper = mount(CompContext)
        const vm = wrapper.vm
        it('default', () => {
            expect('function').to.equal(typeof Object.getOwnPropertyDescriptor(vm, 'getData')!.get)
            expect('function').to.equal(typeof Object.getOwnPropertyDescriptor(vm, 'setData')!.set)

        })
    }
)

export default {}
