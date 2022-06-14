import { makeObject, obtainSlot } from '../utils'
import { Cons, OptionBuilder } from '../component'
import { toComponentReverse, excludeNames, getValidNames } from '../utils'
export const LifecycleNames = [
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
    "errorCaptured",
    "serverPrefetch"
] as const

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const protoArr = toComponentReverse(cons.prototype)

    optionBuilder.lifecycle ??= {}
    optionBuilder.methods ??= {}
    const LifecycleFunctions: Record<string, Function> = {}
    const MethodFunctions: Record<string, Function> = {}
    protoArr.forEach(proto => {
        excludeNames(getValidNames(proto, (des, name) => {
            if (name === 'constructor') {
                return false
            }
            if (typeof des.value === 'function') {
                return true
            }
            return false
        }), slot).forEach(name => {
            if (LifecycleNames.includes(name as any)) {
                LifecycleFunctions[name] = proto[name]
            }
            else {
                MethodFunctions[name] = proto[name]
            }
        })


    })

    Object.assign(optionBuilder.methods, MethodFunctions)
    const bccbs = optionBuilder.beforeCreateCallbacks
    if (bccbs && bccbs.length > 0) {
        const oldBc = LifecycleFunctions['beforeCreate']
        LifecycleFunctions['beforeCreate']=function(){
            bccbs.forEach(bccb=>bccb.apply(this,arguments))
            if(oldBc){
                oldBc.apply(this,arguments)
            }
        }
    }
    Object.assign(optionBuilder.lifecycle, LifecycleFunctions)

}