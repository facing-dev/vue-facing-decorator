
import { inject } from 'vue'
import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { mountSuspense } from '../utils'
import 'mocha'
import { Component, Base, Prop, setup } from '../../dist'

const SETUP_AXIOM = 'setup is working to allow composition API usage'
const DATA_AXIOM = 'data is injected into the template'
const injectionKey = Symbol('injection test key')

function useInjectedValue() {
    return inject(injectionKey)
}

@Component({
    render() { return [] }
})
export class SyncComp extends Base {

    injectedValue = setup(() => useInjectedValue())

}

const SyncCompContext = SyncComp as any

@Component({
    render() { return [] }
})
export class AsyncComp extends Base {

    injectedValue = setup(() => {
        const value = useInjectedValue()
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(value)
            }, 1)  
        })
    })

}

const AsyncCompContext = AsyncComp as any

@Component({
    setup() {
        const injectedValue = useInjectedValue()
        return { injectedValue }
    },
    template: '{{ injectedValue }} {{ dataValue }}'
})
export class SetupComp extends Base {
    dataValue = DATA_AXIOM 
}

const SetupCompContext = SetupComp as any

describe('setup function', () => {
    describe('synchronous setup', () => {
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

    describe('asynchronous setup', () => {
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
        })
    })
})

describe('setup option', () => {
    const wrapper = mount(SetupCompContext, {
        global: {
            provide: {
                [injectionKey]: SETUP_AXIOM
            }
        }
    })
    it('can inject variables into the template', () => {
        expect(wrapper.text()).to.contain(SETUP_AXIOM)
        expect(wrapper.text()).to.contain(DATA_AXIOM)
    })
})

export default {}
