
import { Cons } from '../component'
import { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optoinNullableMemberDecorator } from '../utils'
export interface InjectConfig {
    from?: string | Symbol
    default?: any
}

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: InjectConfig) {
    const slot = obtainSlot(proto)
    let map = slot.obtainMap<Map<string, InjectConfig>>('inject')
    const opt = Object.assign({}, option ?? {})
    map.set(name, opt)
})


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


