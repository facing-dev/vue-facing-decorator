import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optoinNullableMemberDecorator } from '../utils'
export type EmitConfig = null | string

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, key?: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('emit');
    map.set(name, typeof key === 'undefined' ? null : key)
})

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.methods ??= {}
    const proto = cons.prototype
    const slot = obtainSlot(proto)
    const names = slot.obtainMap('emit')
    const emits = slot.obtainMap('emits')

    if (names) {
        names.forEach((value, key) => {
            const eventName = value === null ? key : value
            emits.set(eventName, true)
            optionBuilder.methods![key] = async function (this: any) {

                const ret = proto[key].apply(this, arguments)
                if (ret instanceof Promise) {
                    const proRet = await ret
                    this.$emit(eventName, proRet)
                }
                else {
                    this.$emit(eventName, ret)
                }
            }
        })
    }

}
