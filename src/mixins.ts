import { ComponentBase } from './component'
import { obtainSlot } from './utils'
import type { VueCons } from './index'
import { Vue } from './index'
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type MixedClass<Mixins extends VueCons[]> = UnionToIntersection<{ [index in keyof Mixins]: InstanceType<Mixins[index]> }[number]>
export function mixins<T extends VueCons[]>(...conses: T) {
    class MixinsClass extends Vue {

    }
    ComponentBase({
        mixins: conses.map((cons => obtainSlot(cons.prototype).cachedVueComponent))
    })(MixinsClass)
    return MixinsClass as any as VueCons<MixedClass<T>>
}







