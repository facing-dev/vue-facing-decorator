import { defineComponent } from 'vue';
import { obtainSlot } from './utils';

const LifecycleNames = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "activated",
    "deactivated",
    "beforeDestroy",
    "beforeUnmount",
    "destroyed",
    "unmounted",
    "renderTracked",
    "renderTriggered",
    "errorCaptured"
]


function makeObject(names: string[], obj: any) {
    return names.reduce<Record<string, any>>((pv, cv) => {
        pv[cv] = obj[cv]
        return pv
    }, {})
}
export function Component(cons: { new(): any, prototype: any }) {
    const slot = obtainSlot(cons.prototype)
    const sample = new cons
    const proto = cons.prototype
    const LifecycleFunctions:Record<string,Function>={}
    const methodNames = Object.getOwnPropertyNames(proto).filter(name => {
        if (name === 'constructor') {
            return false
        }
        if (typeof proto[name] === 'function') {
            if(LifecycleNames.includes(name)){
                LifecycleFunctions[name]=proto[name]
                return false
            }

            return true
        }
    })

    const dataNames = Object.getOwnPropertyNames(sample)

    const def = defineComponent({
        data() {
            return makeObject(dataNames, sample)
        },
        methods: makeObject(methodNames, proto),
        ...LifecycleFunctions
    })
    return def as any


}