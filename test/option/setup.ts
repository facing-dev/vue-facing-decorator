
import { inject } from 'vue'
import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { mountSuspense } from '../utils'
import 'mocha'
import { Component, Base, Setup } from '../../dist'

const SETUP_AXIOM = 'setup is working to allow composition API usage'
const DATA_AXIOM = 'data is injected into the template'
const injectionKey = Symbol('injection test key')

function useInjectedValue() {
    return inject(injectionKey) as string
}

@Component({
    render() { return [] }
})
export class SyncComp extends Base {
    @Setup(useInjectedValue)
    injectedValue !: string

}

const SyncCompContext = SyncComp as any

@Component({
    render() { return [] },
    setup(){
        return {
            componentSetup:'componentSetupV'
        }
    }
})
export class AsyncComp extends Base {
    @Setup(() => {
        const value = useInjectedValue()
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(value)
            }, 1)
        })
    })
    injectedValue !: string
}

const AsyncCompContext = AsyncComp as any

describe('setup function', () => {
    describe('synchronous use', () => {
        const wrapper = mount(SyncCompContext, {
            global: {
                provide: {
                    [injectionKey]: SETUP_AXIOM
                }
            }
        })
        const vm = wrapper.vm
        it('injects the value provided to the component via composition API', () => {
            expect(vm.injectedValue).to.equal(SETUP_AXIOM)
        })
    })

    describe('asynchronous use', () => {
        it('injects the value provided to the component via composition API', async () => {
            const wrapper = await mountSuspense(AsyncCompContext, {
                global: {
                    provide: {
                        [injectionKey]: SETUP_AXIOM
                    }
                }
            })
            const vm = wrapper.findComponent(AsyncCompContext).vm
            expect(vm.injectedValue).to.equal(SETUP_AXIOM)
            expect(vm.componentSetup).to.equal('componentSetupV')
        })
    })
})



export default {}
