import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optoinNullableMemberDecorator } from '../utils'
import { decorator as PropsDecorator, type PropsConfig } from './props'

export type VModelConfig = PropsConfig & {
    name?: string
}

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: VModelConfig) {
    option ??= {}
    const slot = obtainSlot(proto)
    let vmodelName = 'modelValue'
    const propsConfig = { ...option }
    if (propsConfig) {
        vmodelName = propsConfig.name ?? vmodelName
        delete propsConfig.name
    }
    PropsDecorator(propsConfig)(proto, vmodelName)
    const map = slot.obtainMap('v-model')
    map.set(name, option)
})


export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('v-model')!
    if (names && names.size > 0) {
        names.forEach((value, name) => {
            const vmodelName = (value && value.name) ?? 'modelValue'
            optionBuilder.computed![name] = {
                get: function (this: any) {
                    return this[vmodelName]
                },
                set: function (val: any) {
                    this.$emit(`update:${vmodelName}`, val)
                }
            }
        })
    }
}
