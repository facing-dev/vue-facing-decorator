import { obtainSlot, optoinNullableMemberDecorator } from '../utils'

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: {}) {
    const slot = obtainSlot(proto)
    let map = slot.obtainMap<Map<string, any>>('vanilla')
    map.set(name, true)
})
