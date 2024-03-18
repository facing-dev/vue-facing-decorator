import type { Identity } from './identity'
import { compatibleMemberDecorator, compatibleClassDecorator } from './deco3/utils';
import { type VueCons, Base } from './class';
import { getSlot, type Slot, type SlotMapNames } from './slot'

export function getPrototypeOf(proto: Identity): Identity | null {
    const p = Object.getPrototypeOf(proto)
    if (!(p instanceof Base)) {
        return null
    }
    return p
}

export function toComponentReverse(proto: Identity) {
    const arr: Identity[] = []
    let curr: Identity | null = proto
    do {
        arr.unshift(curr)
        curr = getPrototypeOf(curr)
    } while (curr !== null && !getSlot(curr))
    return arr
}

export function getSuperSlot(proto: Identity) {
    let curr = getPrototypeOf(proto)

    while (curr !== null) {
        const slot = getSlot(curr)
        if (slot) {
            return slot
        }
        curr = getPrototypeOf(proto)
    }
    return null
}

/**
 * Filter decorated names
 */
export function filterNames(names: string[], slot: Slot, mapNames?: SlotMapNames[]) {
    return names.filter(name => {
        let currSlot: Slot | null = slot
        while (currSlot != null) {
            for (const mapName of currSlot.names.keys()) {
                if (mapName === 'customDecorator') {
                    const map = currSlot.obtainMap('customDecorator')
                    if (map.has(name)) {
                        if (map.get(name)!.every(ite => !ite.preserve)) {
                            return false
                        }
                    }
                }
                if (mapNames && mapNames.includes(mapName)) {
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

/**
 * Get own propertie name by a filter
 */
export function getValidOwnPropertyNames(obj: any, filter: (des: PropertyDescriptor, name: string) => boolean) {
    const descriptors = Object.getOwnPropertyDescriptors(obj)
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name))
}


/**
 * Transform provide into function.
 */
export function getProviderFunction(provide: any): () => {} {
    if (typeof provide === 'function') return provide
    return function () { return provide || {} }
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

