import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { makeObject, obtainSlot, excludeNames, getValidNames } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder,vueInstance)
    let names = getValidNames(sample, (des) => {
        return !!des.enumerable
    })
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot,(mapName) => {
        //include these names:
        //provide, user may access field directly
        return !['provide'].includes(mapName)
    })
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
