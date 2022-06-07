
export { Component, ComponentBase } from './component'
export { decorator as Ref } from './option/ref'
export { decorator as Watch } from './option/watch'
export { decorator as Prop } from './option/props'
export { decorator as Inject } from './option/inject'
export { decorator as Emit } from './option/emit'

import type {
    ComponentPublicInstance,
    ComponentOptions
} from 'vue'


export const Base = class { } as {
    new(): ComponentPublicInstance
}


export const Vue = Base
