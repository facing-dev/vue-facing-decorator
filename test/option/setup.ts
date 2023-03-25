
import { inject } from 'vue'
import { mount } from '@vue/test-utils'
import { expect } from 'chai';
import 'mocha';
import { Component, Base, setup } from '../../dist'

const AXIOM = 'setup is working to allow composition API usage'
const injectionKey = Symbol('injection test key')

function useInjectedValue() {
    inject(injectionKey)
}

@Component
export class Comp extends Base {

    injectedValue = setup(() => useInjectedValue())

}

const CompContext = Comp as any


describe('setup function',
    () => {
        const wrapper = mount(CompContext,{
            global: {
                provide: {
                    [injectionKey]: AXIOM
                }
            }
        })
        const vm = wrapper.vm
        it('injects the value provided to the component via composition API', () => {
            expect(vm.injectedValue).to.equal(AXIOM)
        })
    }
)

export default {}
