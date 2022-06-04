import { Cons, OptionBuilder } from '../component'
import { obtainSlot } from '../utils'
export function decorator(proto: any, name: string) {
    const slot = obtainSlot(proto)
    let map=slot.obtainMap<Map<string, any>>('ref')
    map.set(name, true)
}

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap<Map<string, any>>('ref')!
    if (names) {
        names.forEach((value, name) => {
            optionBuilder.computed![name] = function (this: any) {
                return this.$refs[name]
            }
        })
    }


}