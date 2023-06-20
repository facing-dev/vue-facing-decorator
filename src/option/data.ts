import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { makeObject, obtainSlot, excludeNames, getValidNames } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance) as any
    let names = getValidNames(sample, (des, name) => {
        return !!des.enumerable && !optionBuilder.methods?.[name]
    })
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot)
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
