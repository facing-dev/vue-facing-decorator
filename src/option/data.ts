import { makeObject } from '../utils'
import { Cons, OptionBuilder } from '../component'
import { obtainSlot, excludeNames, getValidNames } from '../utils'
export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.data ??= {}
    const sample = new cons

    let names = getValidNames(sample, (des) => {
        return !!des.enumerable
    })

    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot)
    Object.assign(optionBuilder.data, makeObject(names, sample))
}