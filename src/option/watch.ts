import { Cons, OptionBuilder } from '../component'
import { obtainSlot } from '../utils'
import type { WatchCallback } from 'vue'
export interface WatchConfig {
    key: string
    handler: WatchCallback,
    flush?: 'post',
    deep?: boolean,
    immediate?: boolean,
}
export function decorator(key: string, option?: Omit<WatchConfig, 'handler' | 'key'>) {

    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        let map = slot.obtainMap<Map<string, WatchConfig>>('watch');


        const opt = Object.assign({}, option ?? {}, {
            key: key,
            handler: proto[name]
        })
        map.set(name, opt)
    }
}

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.watch ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('watch')
    if (names) {
        names.forEach(value => {
            optionBuilder.watch![value.key] = value
        })
    }

}