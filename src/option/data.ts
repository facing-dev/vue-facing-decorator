import { makeObject } from '../utils'
import { Cons } from '../component'
import { OptionBuilder } from '../optionBuilder'
import { obtainSlot, excludeNames, getValidNames } from '../utils'
export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any, propNames?: string[]) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance)
    let names = getValidNames(sample, (des) => {
        return !!des.enumerable
    })
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot)
    Object.assign(optionBuilder.data, makeObject(names, sample))
}