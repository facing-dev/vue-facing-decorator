import type { ComponentPublicInstance } from 'vue'
import type { VueCons } from '../index'
export function TSX<Properties extends {} = {}, Events extends {} = {}>() {
    type TEvents = { [index in keyof Events as `on${Capitalize<index & string>}`]: Events[index] extends Function ? Events[index] : { (param: Events[index]): any } }
    return function <C extends VueCons>(cons: C) {
        return cons as unknown as {
            new(): ComponentPublicInstance<Properties & TEvents> & InstanceType<C>
        }
    }
}
