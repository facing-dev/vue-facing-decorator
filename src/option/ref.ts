import type { Cons } from '../component'
import { type OptionBuilder, applyAccessors } from '../optionBuilder'
import { obtainSlot, optoinNullableMemberDecorator } from '../utils'

export type RefConfig = null | string

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, key?: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('ref')
    map.set(name, typeof key === 'undefined' ? null : key)
})


export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)

    const names = slot.getMap('ref')
    if (!names || names.size === 0) {
        return
    }

    applyAccessors(optionBuilder, (ctx: any) => {
        const data: Map<string, { get: () => any, set: undefined }> = new Map
        names.forEach((value, name) => {
            const refKey = value === null ? name : value
            data.set(name, {
                get: function (this: any) {
                    return ctx.$refs[refKey]
                },
                set: undefined

            })
        })
        return data
    })

}
