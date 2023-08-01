import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optionNullableMemberDecorator } from '../utils'

export interface PropsConfig {
    type?: any
    required?: boolean
    default?: any
    validator?(value: any): boolean;
}

export const decorator = optionNullableMemberDecorator(function (proto: any, name: string, option?: PropsConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('props')
    const opt = Object.assign({}, option ?? {})
    map.set(name, opt as PropsConfig)
})

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.props ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.getMap('props')
    if (!names || names.size === 0) {
        return
    }

    names.forEach((value, name) => {
        optionBuilder.props![name] = value
    })


}


