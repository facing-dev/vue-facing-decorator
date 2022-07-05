
export { Component, ComponentBase } from './component'
export { decorator as Ref } from './option/ref'
export { decorator as Watch } from './option/watch'
export { decorator as Prop } from './option/props'
export { decorator as Inject } from './option/inject'
export { decorator as Emit } from './option/emit'
export { decorator as VModel } from './option/vmodel'
import type {
    ComponentPublicInstance
} from 'vue'
const IdentifySymbol = Symbol('vue-facing-decorator-identify')
export interface BaseTypeIdentify {
    [IdentifySymbol]: undefined
}
export function TSX<Properties extends {}>() {
    return function <C extends { new(): ComponentPublicInstance & BaseTypeIdentify }>(cons: C) {
        return cons as unknown as {
            new(): Omit<ComponentPublicInstance<(InstanceType<C>['$props']) & Properties>, keyof Properties> & InstanceType<C>//& ComponentPublicInstance & BaseTypeIdentify
        }
    }
}

export const Base = class { } as {
    new(): ComponentPublicInstance & BaseTypeIdentify
}
export const Vue = Base
