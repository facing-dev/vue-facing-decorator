import { makeObject, obtainSlot } from '../utils'
import { Cons, OptionBuilder } from '../component'
import { toBaseReverse, excludeNames, getValidNames } from '../utils'
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

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const protoArr = toBaseReverse(cons.prototype).reverse()
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
            if (LifecycleNames.includes(name)) {
                LifecycleFunctions[name] = proto[name]
            }
            else {
                MethodFunctions[name] = proto[name]
            }
        })


    })

    Object.assign(optionBuilder.methods, MethodFunctions)
    Object.assign(optionBuilder.lifecycle, LifecycleFunctions)

}