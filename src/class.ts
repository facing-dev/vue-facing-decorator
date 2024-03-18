import type { ComponentPublicInstance } from 'vue'
import type { IdentityType, Identity, IdentitySymbol } from './identity'
export type VueCons<RawInstance extends Identity = Identity, IT extends IdentityType = { props: {}, events: {} }, Bundle = IT['props'] & { [index in keyof IT['events']as `on${Capitalize<index & string>}`]?: IT['events'][index] extends Function ? IT['events'][index] : { (param: IT['events'][index]): any } }> = {
    new(): ComponentPublicInstance<Bundle> & Identity<IT> & Omit<RawInstance, typeof IdentitySymbol>
}

export const Base = class {

} as VueCons