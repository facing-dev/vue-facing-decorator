import type { VueCons } from '../class'
import type { OptionBuilder } from '../optionBuilder'
import { makeObject, obtainSlot, filterNames, getValidOwnPropertyNames } from '../utils'

export function build(cons: VueCons, optionBuilder: OptionBuilder, vueInstance: any) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance) as any
    let names = getValidOwnPropertyNames(sample, (des, name) => {
        return !!des.enumerable
            && !optionBuilder.methods?.[name]
            && !optionBuilder.props?.[name]
    })
    const slot = obtainSlot(cons.prototype)
    //include these names:
    //provide, user may access field directly
    //customDecorator
    names = filterNames(names, slot, ['provide', 'customDecorator'])
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
