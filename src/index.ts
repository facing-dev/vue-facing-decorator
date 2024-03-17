export { Component, ComponentBase } from './component'
export { decorator as Setup } from './option/setup'
export { decorator as Ref } from './option/ref'
export { decorator as Watch } from './option/watch'
export { decorator as Prop } from './option/props'
export { decorator as Provide } from './option/provide'
export { decorator as Inject } from './option/inject'
export { decorator as Emit } from './option/emit'
export { decorator as VModel, decorator as Model } from './option/vmodel'
export { decorator as Vanilla } from './option/vanilla'
export { decorator as Hook } from './option/methodsAndHooks'
export { createDecorator } from './custom/custom'
export { mixins } from './mixins'
import type { ComponentPublicInstance } from 'vue'
import type { OptionBuilder } from './optionBuilder'
export { TSX } from './tsx/type'
import type { IdentityType, Identity, IdentitySymbol } from './identity'

export type VueCons<RawInstance extends Identity = Identity, IT extends IdentityType = { props:{} , events: {} }, Bundle = IT['props'] & { [index in keyof IT['events']as `on${Capitalize<index & string>}`]?: IT['events'][index] extends Function ? IT['events'][index] : { (param: IT['events'][index]): any } }> = {
    new(optionBuilder: OptionBuilder, vueInstance: any): ComponentPublicInstance<Bundle> & Identity<IT> & Omit<RawInstance, typeof IdentitySymbol>
}

export const Base = class {
    constructor(optionBuilder: OptionBuilder, vueInstance: any) {
        const props = optionBuilder.props
        if (props) {
            Object.keys(props).forEach(key => {
                (this as any)[key] = vueInstance[key];
            })
        }
        const methods = optionBuilder.methods
        if (methods) {
            Object.keys(methods).forEach(key => {
                (this as any)[key] = methods[key].bind(vueInstance)
            })
        }
    }

} as VueCons

export const Vue = Base

export { toNative } from './component'
