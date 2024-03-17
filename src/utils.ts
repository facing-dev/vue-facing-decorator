import { Metadata } from 'facing-metadata'
import type { Identity } from './identity'
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
import { compatibleMemberDecorator, compatibleClassDecorator } from './deco3/utils';
import { type VueCons, Base } from './class';


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
    customDecorator: Map<string, CustomDecoratorRecord[]>
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

const metadata = new Metadata<Slot>(SlotSymbol)

export function makeSlot(obj: any, defaultSlot?: Slot): Slot {
    if (getSlot(obj)) {
        throw ''
    }
    if (defaultSlot) {
        defaultSlot.master = obj
    }
    const slot = defaultSlot ?? new Slot(obj)
    metadata.create(obj, slot)
    return slot
}

export function getSlot(obj: any): Slot | undefined {
    return metadata.getOwn(obj)
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
                        if (map.get(name)!.every(ite => !ite.preserve)) {
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
    function decorator(): any
    function decorator(option: T): any//option
    function decorator(proto: Identity, name: any): any//deco stage 2
    function decorator(value: any, ctx: ClassMemberDecoratorContext): any //deco stage 3
    function decorator(optionOrProtoOrValue?: T | Identity | any, nameOrCtx?: string | ClassMemberDecoratorContext): any {
        if (nameOrCtx) {//no option
            const protoOrValue = optionOrProtoOrValue as Identity | any
            compatibleMemberDecorator(function (proto: any, name: any) {
                handler(proto, name)
            })(protoOrValue, nameOrCtx)
        }
        else {//with option
            const option = optionOrProtoOrValue as T
            return compatibleMemberDecorator(function (proto: any, name: any) {
                handler(proto, name, option as T | undefined)
            })
        }
    }

    return decorator
}

export function optionNullableClassDecorator<T>(handler: { (cons: VueCons, option?: T): any }) {
    function decorator(): any
    function decorator(option: T): any//option
    function decorator(cons: VueCons): any//deco stage 2
    function decorator(cons: VueCons, ctx: ClassDecoratorContext): any//deco stage 3
    function decorator(optionOrCons?: T | VueCons, ctx?: ClassDecoratorContext) {
        if (typeof optionOrCons === 'function') {
            const cons = optionOrCons as VueCons
            compatibleClassDecorator(function (cons: VueCons) {
                handler(cons)
            })(cons, ctx)

        } else {
            const option = optionOrCons as T
            return compatibleClassDecorator(function (cons: VueCons) {
                handler(cons, option)
            })
        }
    }
    return decorator
}

export function getProviderFunction(provide: any): () => {} {
    if (typeof provide === 'function') return provide
    return function () { return provide || {} }
}
