import { optionNullableMemberDecorator } from '../utils'
import { obtainSlot } from '../slot'
export const decorator = optionNullableMemberDecorator(function (proto: any, name: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('vanilla')
    map.set(name, true)
})
