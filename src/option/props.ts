import { Cons, OptionBuilder } from '../component'
import { obtainSlot } from '../utils'
export interface PropsConfig {
    type?: any
    required?: boolean
    default?: any
    validator?(value: any): boolean;
}

export function decorator(option?: PropsConfig) {

    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        let map = slot.obtainMap<Map<string, PropsConfig>>('props')
        const opt = Object.assign({}, option ?? {})
        map.set(name, opt)

    }
}

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.props ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap<Map<string, PropsConfig>>('props')

    if (names) {
        names.forEach((value, name) => {
            optionBuilder.props![name] = value
        })
    }

}


