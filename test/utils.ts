import { defineComponent, h, Suspense } from 'vue'
import { mount } from '@vue/test-utils'

import type { VueWrapper } from '@vue/test-utils'

export function isEmptyObject(arg: any) {
    if (['undefined', 'function'].includes(typeof arg)) {
        return true
    }
    if (arg === null) {
        return true
    }
    if (typeof arg === 'object') {
        if (Array.isArray(arg)) {
            return arg.length === 0
        } else {
            return Object.keys(arg).length === 0
        }
    }
}

export function mountSuspense(component: any, options: any = {}): Promise<VueWrapper> {
    return new Promise<VueWrapper>((resolve, reject) => {
        const wrapper = mount(defineComponent({
            render() {
                return h(Suspense, {
                    onResolve: () => resolve(wrapper)
                }, {
                    default: h(component, options?.props),
                    fallback: h('div', 'fallback')
                })
            }
        }), { global: options?.global })
    })
}
