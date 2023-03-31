import type { OptionSetupFunction } from '../component'
import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot } from '../utils'

export type SetupConfig = {
    setupFunction: OptionSetupFunction
}

export function decorator(setupFunction: OptionSetupFunction) {
    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        const map = slot.obtainMap('setup')
        map.set(name, {
            setupFunction
        })
    }

}

const isPromise = (v: any): v is Promise<any> => v instanceof Promise
//(v: any) => typeof v === 'object' && typeof v.then === 'function'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const map = slot.obtainMap('setup')
    if (map.size === 0) {
        return
    }
    const setup: OptionSetupFunction = function (props, ctx) {
        const setupData: Record<string, any> = {};
        let promises: Promise<any>[] | null = null;
        for (const name of map.keys()) {
            const setupState = map.get(name)!.setupFunction(props, ctx)
            if (isPromise(setupState)) {
                promises ??= []
                promises.push(setupState.then((v) => {
                    setupData[name] = v
                }))
            } else {
                setupData[name] = setupState
            }
        }
        if (Array.isArray(promises)) {
            return Promise.all(promises).then(() => {
                return setupData
            })
        } else {
            return setupData
        }
    }
    optionBuilder.setup = setup
}
