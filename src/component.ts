import { defineComponent } from 'vue';
import { obtainSlot } from './utils';
function makeObject(names:string[],obj:any){
    return names.reduce<Record<string, any>>((pv, cv) => {
        pv[cv] = obj[cv]
        return pv
    }, {})
}
export function Component(cons: { new(): any, prototype: any }) {
    const slot = obtainSlot(cons.prototype)
    const sample = new cons
    const proto = cons.prototype
    const methodNames = Object.getOwnPropertyNames(cons.prototype).filter(name => {
        if (name === 'constructor') {
            return false
        }
        if (typeof proto[name] === 'function') {
            return true
        }
    })

    const dataNames = Object.getOwnPropertyNames(sample)

    const def = defineComponent({
        data() {
            return makeObject(dataNames,sample)
        },
        methods: makeObject(methodNames,proto)
    })
    return def as any


}