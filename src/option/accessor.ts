import type { Cons } from '../component'
import { type OptionBuilder, applyAccessors} from '../optionBuilder'
import { toComponentReverse, obtainSlot } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const vanillaMap = slot.obtainMap('vanilla')
    const protoArr = toComponentReverse(cons.prototype)
    const map: Map<string, { get: (() => any) | undefined, set: ((v: any) => any) | undefined }> = new Map

    applyAccessors(optionBuilder,(ctx:any)=>{
        protoArr.forEach(proto => {
            const deses = Object.getOwnPropertyDescriptors(proto)
            for (const name in deses) {
                const des = deses[name]
                if (des && vanillaMap.has(name)) {
                    if (typeof des.get === 'function' || typeof des.set === 'function') {
                        map.set(name, {
                            set: typeof des.set === 'function' ? des.set.bind(ctx) : undefined,
                            get: typeof des.get === 'function' ? des.get.bind(ctx) : undefined,
                        })
                    }
                }
            }
        })
        return map
    })
}
