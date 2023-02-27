import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optoinNullableMemberDecorator } from '../utils'

export interface InjectConfig {
    from?: string | Symbol
    default?: any
}

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: InjectConfig) {
    const slot = obtainSlot(proto)
    let map = slot.obtainMap('inject')
    const opt = Object.assign({}, option ?? {})
    map.set(name, opt)
})


export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.inject ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('inject')
    if (names) {
        names.forEach((value, name) => {
            optionBuilder.inject![name] = value
        })
    }

}


