import { Cons, OptionBuilder } from '../component'
import { obtainSlot } from '../utils'
import type { WatchCallback } from 'vue'
export type EmitConfig = null | string
export function decorator(key?: string) {

    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        let map = slot.obtainMap<Map<string, EmitConfig>>('emit');
        map.set(name, typeof key === 'undefined' ? null : key)
    }
}

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