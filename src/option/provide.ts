import { computed } from 'vue';
import type { VueCons } from '../class';
import type { OptionBuilder } from '../optionBuilder'
import { optionNullableMemberDecorator } from '../utils'
import { obtainSlot } from '../slot'
export type ProvideConfig = null | string

export const decorator = optionNullableMemberDecorator(function (proto: any, name: string, key?: ProvideConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('provide')
    map.set(name, typeof key === 'undefined' ? null : key)
})

export function build(cons: VueCons, optionBuilder: OptionBuilder, vueInstance: any) {
    optionBuilder.provide ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('provide')
    if (!names) return null
    names.forEach((value, name) => {
        const key = value === null ? name : value
        optionBuilder.provide![key] = computed(() => vueInstance[name])
    })
}
