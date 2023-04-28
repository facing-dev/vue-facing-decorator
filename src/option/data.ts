import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { makeObject, obtainSlot, excludeNames, getValidNames } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any, _propNames?: string[],decoratorKeyMap?: Map<string,any>) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance)

    let names = getValidNames(sample, (des,name) => {
        return !!des.enumerable && !decoratorKeyMap?.has(name)
    })
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot)
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
