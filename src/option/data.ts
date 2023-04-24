import type { Cons } from '../component'
import { CustomRecords } from '../custom/custom'
import type { OptionBuilder } from '../optionBuilder'
import { excludeNames, getValidNames, makeObject, obtainSlot } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any, _propNames?: string[]) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance)

    const decoratorKeys = CustomRecords.map((e) => e.key);

    let names = getValidNames(sample, (des, name) => {
        return !!des.enumerable && !decoratorKeys.includes(name);
    });
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot)
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
