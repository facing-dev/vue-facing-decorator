import { computed } from 'vue';
import type { Cons } from '../component';
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optionNullableMemberDecorator } from '../utils'

export type ProvideConfig = null | string

export const decorator = optionNullableMemberDecorator(function (proto: any, name: string, key?: ProvideConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('provide')
    map.set(name, typeof key === 'undefined' ? null : key)
})

export function build(cons: Cons, optionBuilder: OptionBuilder, vueInstance: any) {
    optionBuilder.provide ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('provide')
    if (!names) return null
    names.forEach((value, name) => {
        const key = value === null ? name : value
        optionBuilder.provide![key] = computed(() => vueInstance[name])
    })
}
