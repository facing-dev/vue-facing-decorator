import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { makeObject, obtainSlot, excludeNames, getValidNames } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any, _propNames?: string[]) {
    const {computed, methods} = optionBuilder
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance)

    const computedAndMethodsKeyMap = new Map([...Object.keys(computed||{}),...Object.keys(methods||{})].map(e=>[e,1]))

    let names = getValidNames(sample, (des,name) => {
        return !!des.enumerable && !computedAndMethodsKeyMap.has(name)
    })
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot)
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
