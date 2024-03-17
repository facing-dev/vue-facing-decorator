import { ComponentBase } from './component'
import { obtainSlot } from './utils'
import type { VueCons } from './class'
import { Vue } from './index'
import type { MergeIdentityType, IdentitySymbol } from './identity'
type MixedClass<Mixins extends VueCons[], Base extends VueCons = VueCons> =
    Mixins extends [infer T extends VueCons, ...infer E extends VueCons[]] ?
    MixedClass<E,
        VueCons<InstanceType<Base> & InstanceType<T>,
            MergeIdentityType<InstanceType<T>[typeof IdentitySymbol], InstanceType<Base>[typeof IdentitySymbol]>
        >
    > :
    Base
export function mixins<T extends VueCons[]>(...conses: T) {
    class MixinsClass extends Vue {
    }
    
    ComponentBase({
        mixins: conses.map((cons => obtainSlot(cons.prototype).cachedVueComponent))
    })(MixinsClass)

    return MixinsClass as any as MixedClass<T>
}




