import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { excludeNames, getValidNames, makeObject, obtainSlot } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any, _propNames?: string[]) {
    optionBuilder.data ??= {}
    const sample = new cons(optionBuilder, vueInstance)

    const decoratorMap = new Map(cons.__d?.map((e) => [e.key,1]) || []);

    let names = getValidNames(sample, (des, name) => {
        return !!des.enumerable && !decoratorMap.get(name);
    });
    const slot = obtainSlot(cons.prototype)
    names = excludeNames(names, slot)
    Object.assign(optionBuilder.data, makeObject(names, sample))
}
