import { Metadata } from 'facing-metadata'
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

const SlotSymbol: unique symbol = Symbol('vue-facing-decorator-slot')

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

export type SlotMapNames = keyof SlotMapTypes

export class Slot {
    master: any
    constructor(master: any) {
        this.master = master
    }
    names: Map<keyof SlotMapTypes, SlotMapTypes[keyof SlotMapTypes]> = new Map()
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