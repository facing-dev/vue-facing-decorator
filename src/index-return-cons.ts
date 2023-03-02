export * from './index'
import { Component as ComponentOld } from './index'

export function Component(this: any,...args:Parameters<typeof ComponentOld>) {
    const res = ComponentOld.apply(this, args)
    function process(res: any) {
        const cons = res.__vfdConstructor

        cons.__vccOpts = res
        return cons
    }
    if (typeof res === 'function') {
        return function (this: any) {
            return process(res.apply(this, arguments as any))
        }
    } else {
        return process(res)
    }
}
