import { Base } from './index'
const SlotSymbol = Symbol('vue-facing-decorator-slot')
class Slot {
    names: Map<string, Set<string>> = new Map
}

export function makeSlot(obj: any): Slot {
    if (obj[SlotSymbol]) {
        throw ''
    }
    const slot = new Slot
    Object.defineProperty(obj, SlotSymbol, {
        enumerable: false,
        value: slot
    })
    return slot
}
export function getSlot(obj: any): Slot | undefined {
    return obj[SlotSymbol]
}

export function obtainSlot(obj: any): Slot {
    const slot = getSlot(obj)
    if (slot) {
        return slot
    }
    return makeSlot(obj)


}

export function makeObject(names: string[], obj: any) {
    return names.reduce<Record<string, any>>((pv, cv) => {
        pv[cv] = obj[cv]
        return pv
    }, {})
}

export function toBaseReverse(obj: any) {
    const arr: any[] = []
    let curr = obj
    while (curr.constructor !== Base) {
        arr.push(curr)
        curr = Object.getPrototypeOf(curr)
    }
    return arr
}

export function excludeNames(names: string[], slot: Slot) {
    return names.filter(name => {
        for (const set of slot.names.values()) {
            if (set.has(name)) {
                return false
            }
        }
        return true
    })
}

export function getValidNames(obj: any, filter: (des: PropertyDescriptor,name:string) => boolean) {
    const descriptors = Object.getOwnPropertyDescriptors(obj)
    return Object.keys(descriptors).filter(name => filter(descriptors[name],name))
}