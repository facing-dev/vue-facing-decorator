
import { Cons, OptionBuilder } from '../component'
import { obtainSlot } from '../utils'
export interface InjectConfig {
    from?: string | Symbol
    default?: any
}

export function decorator(option?: InjectConfig) {
    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        let map = slot.obtainMap<Map<string, InjectConfig>>('inject')
        const opt = Object.assign({}, option ?? {})
        map.set(name, opt)
    }
}

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.inject ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap<Map<string, InjectConfig>>('inject')
    if (names) {
        names.forEach((value, name) => {
            optionBuilder.inject![name] = value
        })
    }

}


