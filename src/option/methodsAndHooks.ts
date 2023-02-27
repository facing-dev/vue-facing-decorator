import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { obtainSlot, toComponentReverse, excludeNames, getValidNames, optoinNullableMemberDecorator } from '../utils'

export const HookNames = [
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
    "serverPrefetch",
    "render"
] as const

export type HookConfig = null
export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('hooks');
    map.set(name, null)
})


export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const protoArr = toComponentReverse(cons.prototype)
    const map = slot.obtainMap('hooks')

    optionBuilder.hooks ??= {}
    optionBuilder.methods ??= {}
    const HookFunctions: Record<string, Function> = {}
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
            if (HookNames.includes(name as any) || map.has(name)) {

                HookFunctions[name] = proto[name]
            }
            else {
                MethodFunctions[name] = proto[name]
            }
        })


    })

    Object.assign(optionBuilder.methods, MethodFunctions)
    const bccbs = optionBuilder.beforeCreateCallbacks
    if (bccbs && bccbs.length > 0) {
        const oldBc = HookFunctions['beforeCreate']
        HookFunctions['beforeCreate'] = function () {
            bccbs.forEach(bccb => bccb.apply(this, arguments))
            if (oldBc) {
                oldBc.apply(this, arguments)
            }
        }
    }
    Object.assign(optionBuilder.hooks, HookFunctions)

}
