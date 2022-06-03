import { makeObject } from '../utils'
import { Cons, OptionBuilder } from '../component'
import { obtainSlot, excludeNames, toBaseReverse, getValidNames } from '../utils'
export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    const set: Set<string> = new Set
    slot.names.set('computed', set)
    const protoArr = toBaseReverse(cons.prototype)
    protoArr.forEach(proto => {
        getValidNames(proto, (des) => {
            return typeof des.get === 'function'
        }).forEach(name => {
            set.add(name)
            optionBuilder.computed![name] = Object.getOwnPropertyDescriptor(proto, name)!.get!
        })
    })
}