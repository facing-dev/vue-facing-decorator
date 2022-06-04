import { makeObject } from '../utils'
import { Cons, OptionBuilder } from '../component'
import { obtainSlot, excludeNames, toBaseReverse, getValidNames } from '../utils'
export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    let map = slot.obtainMap<Map<string, any>>('computed')
    const protoArr = toBaseReverse(cons.prototype)
    protoArr.forEach(proto => {
        getValidNames(proto, (des) => {
            return typeof des.get === 'function'
        }).forEach(name => {
            map.set(name, true)
            optionBuilder.computed![name] = Object.getOwnPropertyDescriptor(proto, name)!.get!
        })
    })
}