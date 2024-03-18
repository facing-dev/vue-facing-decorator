import type { VueCons } from '../class'
import type { OptionBuilder } from '../optionBuilder'
import { toComponentReverse, filterNames, getValidOwnPropertyNames, optionNullableMemberDecorator } from '../utils'
import { obtainSlot } from '../slot'
export const HookNames: ReadonlyArray<string> = [
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
export const decorator = optionNullableMemberDecorator(function (proto: any, name: string) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('hooks');
    map.set(name, null)
})

export function build(cons: VueCons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const protoArr = toComponentReverse(cons.prototype)
    const map = slot.obtainMap('hooks')

    optionBuilder.hooks ??= {}
    optionBuilder.methods ??= {}
    const HookFunctions: Record<string, Function> = {}
    const MethodFunctions: Record<string, Function> = {}
    protoArr.forEach(proto => {
        let names = getValidOwnPropertyNames(proto, (des, name) => {
            return typeof des.value === 'function' && name !== 'constructor'
        })
        //include these names:
        //watch, user may call watch method directly
        //hooks, user may call hook method directly
        //emits, user may have a method name which is same as one of event names
        //provide, user may access field directly
        //customDecorator
        names = filterNames(names, slot, ['watch', 'hooks', 'emits', 'provide', 'customDecorator']);
        names.forEach(name => {
            if (HookNames.includes(name) || map.has(name)) {
                HookFunctions[name] = proto[name]
            } else {
                MethodFunctions[name] = proto[name]
            }
        })
    })

    Object.assign(optionBuilder.methods, MethodFunctions)
    const beforeCreateCallbacks = [...optionBuilder.beforeCreateCallbacks ?? []]
    if (beforeCreateCallbacks && beforeCreateCallbacks.length > 0) {
        const oldBeforeCreateCallback = HookFunctions['beforeCreate']
        HookFunctions['beforeCreate'] = function () {
            beforeCreateCallbacks.forEach(callback => callback.apply(this, arguments))
            if (oldBeforeCreateCallback) {
                oldBeforeCreateCallback.apply(this, arguments)
            }
        }
    }
    Object.assign(optionBuilder.hooks, HookFunctions)
}
