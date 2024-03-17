import type { ComponentPublicInstance } from 'vue'
import type { OptionBuilder } from './optionBuilder'
import type { IdentityType, Identity, IdentitySymbol } from './identity'
export type VueCons<RawInstance extends Identity = Identity, IT extends IdentityType = { props: {}, events: {} }, Bundle = IT['props'] & { [index in keyof IT['events']as `on${Capitalize<index & string>}`]?: IT['events'][index] extends Function ? IT['events'][index] : { (param: IT['events'][index]): any } }> = {
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