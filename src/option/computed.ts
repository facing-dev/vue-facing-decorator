import type { Cons } from '../component'
import { obtainSlot, toComponentReverse, getValidNames } from '../utils'
import type { OptionBuilder } from '../optionBuilder'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    const map = slot.obtainMap('computed')
    const vanillaMap = slot.obtainMap('vanilla')
    const protoArr = toComponentReverse(cons.prototype)
    protoArr.forEach(proto => {
        getValidNames(proto, (des, name) => {
            return (typeof des.get === 'function' || typeof des.set === 'function') && !vanillaMap.has(name)
        }).forEach(name => {

            map.set(name, true)
            const des = Object.getOwnPropertyDescriptor(proto, name)!
            optionBuilder.computed![name] = {
                get: typeof des.get === 'function' ? des.get : undefined,
                set: typeof des.set === 'function' ? des.set : undefined
            }
        })
    })
}
