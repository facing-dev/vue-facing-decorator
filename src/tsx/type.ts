import type { IdentityType, MergeIdentityType, IdentitySymbol } from '../identity'
import type { VueCons } from '../index'

export function TSX<Properties extends IdentityType['props'] = {}, Events extends IdentityType['events'] = {}, IT extends IdentityType = {
    props: Properties
    events: Events
}>() {
    return function <C extends VueCons>(cons: C): VueCons<InstanceType<C>, MergeIdentityType<IT, InstanceType<C>[typeof IdentitySymbol]>> {
        return cons as any
    }
}