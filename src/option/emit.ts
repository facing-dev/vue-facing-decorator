import type { VueCons } from '../class'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, optionNullableMemberDecorator } from '../utils'
export type EmitConfig = null | string

export const decorator = optionNullableMemberDecorator(function (proto: any, name: string, key?: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('emit');
    map.set(name, typeof key === 'undefined' ? null : key)
})

export function build(cons: VueCons, optionBuilder: OptionBuilder) {
    optionBuilder.methods ??= {}
    const proto = cons.prototype
    const slot = obtainSlot(proto)
    const names = slot.getMap('emit')
    if (!names || names.size === 0) {
        return
    }
    const emits = slot.obtainMap('emits')
    names.forEach((value, key) => {
        const eventName = value === null ? key : value
        emits.set(eventName, true)
        optionBuilder.methods![key] = async function (this: any) {

            const ret = proto[key].apply(this, arguments)
            if (ret instanceof Promise) {
                const proRet = await ret
                this.$emit(eventName, proRet)
            }
            else if (ret === undefined) {
                this.$emit(eventName)
            } else {
                this.$emit(eventName, ret)
            }
        }
    })

}
