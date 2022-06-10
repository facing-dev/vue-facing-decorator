import { Base } from './index'
import type { BaseTypeIdentify } from './index'
const SlotSymbol = Symbol('vue-facing-decorator-slot')
class Slot {
    master: any
    constructor(master: any) {
        this.master = master
    }
    names: Map<string, Map<string, any>> = new Map
    obtainMap<T extends Map<string, any>>(name: string): T {
        let map = this.names.get(name)
        if (!map) {

            map = new Map
            this.names.set(name, map)
        } else {

        }
        return map as any
    }
    inComponent = false
    cachedVueComponent: any = null
}

export function makeSlot(obj: any): Slot {
    if (getSlot(obj)) {
        throw ''
    }
    const slot = new Slot(obj)
    Object.defineProperty(obj, SlotSymbol, {
        enumerable: false,
        value: slot
    })
    return slot
}
export function getSlot(obj: any): Slot | undefined {

    return Object.getOwnPropertyDescriptor(obj, SlotSymbol)?.value
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

// export function toBaseReverse(obj: any) {
//     const arr: any[] = []
//     let curr = obj
//     while (curr.constructor !== Base) {
//         arr.unshift(curr)
//         curr = Object.getPrototypeOf(curr)
//     }
//     return arr
// }

export function toComponentReverse(obj: any) {
    const arr: any[] = []
    let curr = obj

    do {

        arr.unshift(curr)
        curr = Object.getPrototypeOf(curr)
    } while (curr.constructor !== Base && !getSlot(curr))
    return arr
}
export function getSuperSlot(obj: any) {
    let curr = Object.getPrototypeOf(obj)

    while (curr.constructor !== Base) {
        const slot = getSlot(curr)
        if (slot) {
            return slot
        }
        curr = Object.getPrototypeOf(curr)
    }
    return null
}

// export function extendSlotPath(obj: any): {
//     constructor: any
// }[] {
//     const arr: any[] = []
//     let curr = obj

//     while (curr.constructor !== Base) {
//         if (getSlot(curr)) {
//             arr.push(curr)
//         }
//         curr = Object.getPrototypeOf(curr)
//     }
//     return arr
// }

export function excludeNames(names: string[], slot: Slot) {
    return names.filter(name => {
        for (const mapName of slot.names.keys()) {
            if (mapName === 'watch') {
                continue
            }
            const map = slot.names.get(mapName)!
            if (map.has(name)) {
                return false
            }
        }
        return true
    })
}

export function getValidNames(obj: any, filter: (des: PropertyDescriptor, name: string) => boolean) {
    const descriptors = Object.getOwnPropertyDescriptors(obj)
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name))
}

export function optoinNullableMemberDecorator<T>(handler: { (proto: any, name: string, option?: T): any }) {
    function decorator(option?: T): any
    function decorator(proto: BaseTypeIdentify, name: any): any
    function decorator(optionOrProto?: T | BaseTypeIdentify, name?: any): any {
        if (name) {
            handler(optionOrProto, name)
        }
        else {
            return function (proto: any, name: any) {
                handler(proto, name, optionOrProto as T | undefined)
            }
        }
    }

    return decorator
}