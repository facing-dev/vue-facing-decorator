import { Base } from './index'
import type { BaseTypeIdentify } from './index'
import type { InjectConfig } from "./option/inject";
import type { EmitConfig } from "./option/emit";
import type { PropsConfig } from "./option/props";
import type { HookConfig } from "./option/methodsAndHooks";
import type { VModelConfig } from "./option/vmodel";
import type { WatchConfig } from "./option/watch";
import type { SetupConfig } from './option/setup'
const SlotSymbol = Symbol('vue-facing-decorator-slot')

export type SlotMapTypes = {
    vanilla: Map<string, boolean>
    computed: Map<string, boolean>
    inject: Map<string, InjectConfig>
    emit: Map<string, EmitConfig>
    emits: Map<string, boolean>
    props: Map<string, PropsConfig>
    hooks: Map<string, HookConfig>
    'v-model': Map<string, VModelConfig>
    watch: Map<string, WatchConfig | WatchConfig[]>
    ref: Map<string, boolean>
    setup: Map<string, SetupConfig>
}

class Slot {
    master: any
    constructor(master: any) {
        this.master = master
    }
    names: Map<string, SlotMapTypes[keyof SlotMapTypes]> = new Map()
    obtainMap<T extends keyof SlotMapTypes>(name: T): SlotMapTypes[T] {
        let map = this.names.get(name)
        if (!map) {
            map = new Map()
            this.names.set(name, map)
        }
        return map as SlotMapTypes[T]
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
// export function 
// export function collect<>(slot: Slot,mapName:keyof SlotMapTypes,) {
//     let currSlot: Slot | null = slot
//     while (currSlot != null) {
//         for (const mapName of currSlot.names.keys()) {
//             if (['watch', 'hooks', 'setup'].includes(mapName)) {
//                 continue
//             }
//             const map = currSlot.names.get(mapName)!
//             if (map.has(name)) {
//                 return false
//             }
//         }
//         currSlot = getSuperSlot(currSlot.master)
//     }

//     return true
// }

export function excludeNames(names: string[], slot: Slot) {
    return names.filter(name => {
        let currSlot: Slot | null = slot
        while (currSlot != null) {
            for (const mapName of currSlot.names.keys()) {

                if (['watch', 'hooks', 'setup','emits'].includes(mapName)) {
                    continue
                }
                const map = currSlot.names.get(mapName)!
                if (map.has(name)) {
                    return false
                }
            }
            currSlot = getSuperSlot(currSlot.master)
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
