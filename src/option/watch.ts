import { Cons, OptionBuilder } from '../component'
import { obtainSlot, } from '../utils'
import type { WatchCallback } from 'vue'
export interface WatchConfig {
    key: string
    handler: WatchCallback,
    flush?: 'post',
    deep?: boolean,
    immediate?: boolean,
}
type Option = Omit<WatchConfig, 'handler' | 'key'>
export function decorator(key: string, option?: Option) {

    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        let map = slot.obtainMap<Map<string, WatchConfig | WatchConfig[]>>('watch');


        const opt = Object.assign({}, option ?? {}, {
            key: key,
            handler: proto[name]
        })
        if (map.has(key)) {
            const t = map.get(key)!
            if (Array.isArray(t)) {
                t.push(opt)
            } else {
                map.set(key, [t, opt])
            }
        }
        else {
            map.set(key, opt)
        }
    }
}

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.watch ??= {}
    const slot = obtainSlot(cons.prototype)
    const keys = slot.obtainMap('watch')
    if (keys) {
        keys.forEach((value, key) => {
            optionBuilder.watch![key] = value
        })
    }

}