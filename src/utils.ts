import { Base } from './index'
import type { BaseTypeIdentify } from './index'
import type { InjectConfig } from "./option/inject";
import type { EmitConfig } from "./option/emit";
import type { PropsConfig } from "./option/props";
import type { HookConfig } from "./option/methodsAndHooks";
import type { VModelConfig } from "./option/vmodel";
import type { WatchConfig } from "./option/watch";
import type { SetupConfig } from './option/setup'
import type { Record as CustomDecoratorRecord } from './custom/custom'
import type { RefConfig } from './option/ref';
import type { ProvideConfig } from './option/provide';
import { compatibleMemberDecorator } from './deco3/utils';

const SlotSymbol = Symbol('vue-facing-decorator-slot')

export type SlotMapTypes = {
    vanilla: Map<string, boolean>
    computed: Map<string, boolean>
    provide: Map<string, ProvideConfig>
    inject: Map<string, InjectConfig>
    emit: Map<string, EmitConfig>
    emits: Map<string, boolean>
    props: Map<string, PropsConfig>
    hooks: Map<string, HookConfig>
    'v-model': Map<string, VModelConfig>
    watch: Map<string, WatchConfig | WatchConfig[]>
    ref: Map<string, RefConfig>
    setup: Map<string, SetupConfig>
    customDecorator: Map<string, CustomDecoratorRecord>
}

class Slot {
    master: any
    constructor(master: any) {
        this.master = master
    }
    names: Map<string, SlotMapTypes[keyof SlotMapTypes]> = new Map()
    obtainMap<T extends keyof SlotMapTypes>(name: T): SlotMapTypes[T] {
        let map = this.getMap(name)
        if (!map) {
            map = new Map()
            this.names.set(name, map)
        }
        return map as SlotMapTypes[T]
    }
    getMap<T extends keyof SlotMapTypes>(name: T) {
        const map = this.names.get(name)
        return map as SlotMapTypes[T] | undefined
    }
    inComponent = false
    cachedVueComponent: any = null
}

export function makeSlot(obj: any, defaultSlot?: Slot): Slot {
    if (getSlot(obj)) {
        throw ''
    }
    if (defaultSlot) {
        defaultSlot.master = obj
    }
    const slot = defaultSlot ?? new Slot(obj)

    Object.defineProperty(obj, SlotSymbol, {
        enumerable: false,
        value: slot
    })
    return slot
}

export function getSlot(obj: any): Slot | undefined {

    return Object.getOwnPropertyDescriptor(obj, SlotSymbol)?.value
}

export function obtainSlot(obj: any, defaultSlot?: Slot): Slot {

    const slot = getSlot(obj)
    if (slot) {
        return slot
    }

    return makeSlot(obj, defaultSlot)
}

export function makeObject(names: string[], obj: any) {
    return names.reduce<Record<string, any>>((pv, cv) => {
        pv[cv] = obj[cv]
        return pv
    }, {})
}

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

/**
 * Exclude decorated names by a filter
 */
export function excludeNames(names: string[], slot: Slot, filter?: (mapName: string) => boolean) {
    return names.filter(name => {
        let currSlot: Slot | null = slot
        while (currSlot != null) {
            for (const mapName of currSlot.names.keys()) {
                if (filter && !filter(mapName)) {
                    continue
                }
                if (mapName === 'customDecorator') {
                    const map = currSlot.obtainMap('customDecorator')
                    if (map.has(name)) {
                        if (!map.get(name)!.preserve) {
                            return false
                        } else {
                            continue
                        }
                    }
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

/**
 * Get own properties by a filter
 */
export function getValidNames(obj: any, filter: (des: PropertyDescriptor, name: string) => boolean) {
    const descriptors = Object.getOwnPropertyDescriptors(obj)
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name))
}

export function optionNullableMemberDecorator<T>(handler: { (proto: any, name: string, option?: T): any }) {
    function decorator(option?: T): any
    function decorator(proto: BaseTypeIdentify, name: any): any
    function decorator(value: any, ctx: ClassMemberDecoratorContext): any //deco stage 3
    function decorator(optionOrProto?: T | BaseTypeIdentify | any, name?: string | ClassMemberDecoratorContext): any {
        if (name) {
            compatibleMemberDecorator(function (proto: any, name: any) {
                handler(proto, name)
            })(optionOrProto, name)
        }
        else {
            return compatibleMemberDecorator(function (proto: any, name: any) {
                handler(proto, name, optionOrProto as T | undefined)
            })
        }
    }

    return decorator
}

export function getProviderFunction(provide: any): () => {} {
    if (typeof provide === 'function') return provide
    return function () { return provide || {} }
}
