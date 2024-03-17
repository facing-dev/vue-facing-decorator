import type { VueCons } from '../class'
import type { OptionBuilder } from '../optionBuilder'
import { makeObject, obtainSlot, excludeNames, getValidNames } from '../utils'

export function build(cons: VueCons, optionBuilder: OptionBuilder, vueInstance: any) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance) as any
    let names = getValidNames(sample, (des, name) => {
        return !!des.enumerable
            && !optionBuilder.methods?.[name]
            && !optionBuilder.props?.[name]
    })
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot,(mapName) => {
        //include these names:
        //provide, user may access field directly
        return !['provide'].includes(mapName)
    })
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
