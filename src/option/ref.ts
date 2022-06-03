import { Cons, OptionBuilder } from '../component'
import { obtainSlot } from '../utils'
export function decorator(cons: any, name: string) {
    const slot = obtainSlot(cons)
    const set: Set<string> = new Set
    slot.names.set('ref', set)
    set.add(name)
}

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.names.get('ref')!
    names.forEach(name => {
        optionBuilder.computed![name] = function (this: any) {
            return this.$refs[name]
        }
    })

}