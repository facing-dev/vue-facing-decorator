import { SetupFunction } from '../component'
import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot } from '../utils'

export type UseConfig = {
    useFunction: SetupFunction
}

export function decorator(useFunction: SetupFunction) {
    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        const map = slot.obtainMap('use')
        map.set(name, {
            useFunction
        })
    }

}

const isPromise = (v: any): v is Promise<any> => v instanceof Promise
//(v: any) => typeof v === 'object' && typeof v.then === 'function'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const map = slot.obtainMap('use')
    if (map.size === 0) {
        return
    }
    const use: SetupFunction = function (props, ctx) {
        const useData: Record<string, any> = {};
        let promises: Promise<any>[] | null = null;
        for (const name of map.keys()) {
            const useState = map.get(name)!.useFunction(props, ctx)
            if (isPromise(useState)) {
                promises ??= []
                promises.push(useState.then((v) => {
                    useData[name] = v
                }))
            } else {
                useData[name] = useState
            }
        }
        if (Array.isArray(promises)) {
            return Promise.all(promises).then(() => {
                return useData
            })
        } else {
            return useData
        }
    }
    optionBuilder.use = use
}
