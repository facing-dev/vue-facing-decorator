import type { InjectionKey } from 'vue'
import type { VueCons } from '../class'
import type { OptionBuilder } from '../optionBuilder'
import { optionNullableMemberDecorator } from '../utils'
import { obtainSlot } from '../slot'
export interface InjectConfig {
    from?: string | symbol | Symbol | InjectionKey<any>
    default?: any
}

export const decorator = optionNullableMemberDecorator(function (proto: any, name: string, option?: InjectConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('inject')
    const opt = Object.assign({}, option ?? {})
    map.set(name, opt)
})


export function build(cons: VueCons, optionBuilder: OptionBuilder) {
    optionBuilder.inject ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.getMap('inject')
    if (!names || names.size === 0) {
        return
    }

    names.forEach((value, name) => {
        optionBuilder.inject![name] = value
    })

}


