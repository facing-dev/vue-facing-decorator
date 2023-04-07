import { defineComponent, type ComponentCustomOptions } from 'vue';
import { obtainSlot, getSuperSlot } from './utils'
import { build as optionSetup } from './option/setup'
import { build as optionComputed } from './option/computed'
import { build as optionData } from './option/data'
import { build as optionMethodsAndHooks } from './option/methodsAndHooks'
import { build as optionRef } from './option/ref'
import { build as optionWatch } from './option/watch'
import { build as optionProps } from './option/props'
import { build as optionInject } from './option/inject'
import { build as optionEmit } from './option/emit'
import { build as optionVModel } from './option/vmodel'
import { build as optionAccessor } from './option/accessor'
import { CustomRecords } from './custom/custom'
import type { SetupContext } from 'vue';
import type { OptionBuilder } from './optionBuilder'
import type { VueCons } from './index'
export type Cons = VueCons

type SetupFunction<T> = (this: void, props: Readonly<any>, ctx: SetupContext<any>) => T | Promise<T>
export type OptionSetupFunction = SetupFunction<any>
export type ComponentSetupFunction = SetupFunction<Record<string, any>>
function ComponentOption(cons: Cons, extend?: any) {

    const optionBuilder: OptionBuilder = {}
    optionSetup(cons, optionBuilder)
    optionVModel(cons, optionBuilder)
    optionComputed(cons, optionBuilder)//after VModel
    optionWatch(cons, optionBuilder)
    optionProps(cons, optionBuilder)
    optionInject(cons, optionBuilder)
    optionEmit(cons, optionBuilder)
    optionRef(cons, optionBuilder)//after Computed
    optionMethodsAndHooks(cons, optionBuilder)//after Ref Computed
    optionAccessor(cons, optionBuilder)


    const setupFunction: OptionSetupFunction | undefined = optionBuilder.setup ? function (props, ctx) {
        return optionBuilder.setup!(props, ctx)
    } : undefined
    const raw = {
        setup: setupFunction,
        data() {
            delete optionBuilder.data
            optionData(cons, optionBuilder, this)
            return optionBuilder.data ?? {}
        },
        methods: optionBuilder.methods,
        computed: optionBuilder.computed,
        watch: optionBuilder.watch,
        props: optionBuilder.props,
        inject: optionBuilder.inject,
        ...optionBuilder.hooks,
        extends: extend
    }
    return raw as any
}

type ComponentOption = {
    name?: string
    emits?: string[]
    provide?: Record<string, any> | Function
    components?: Record<string, any>
    directives?: Record<string, any>;
    inheritAttrs?: boolean;
    expose?: string[];
    render?: Function;
    modifier?: (raw: any) => any
    options?: ComponentCustomOptions & Record<string, any>
    template?: string
    mixins?: any[]
    setup?: ComponentSetupFunction
}
type ComponentConsOption = Cons | ComponentOption
function buildComponent(cons: Cons, arg: ComponentOption, extend?: any): any {
    const option = ComponentOption(cons, extend)
    const slot = obtainSlot(cons.prototype)
    Object.keys(arg).reduce<Record<string, any>>((option, name: string) => {
        if (['options', 'modifier', 'emits', 'setup'].includes(name)) {
            return option
        }
        option[name] = arg[name as keyof ComponentOption]
        return option
    }, option)
    let emits = Array.from(slot.obtainMap('emits').keys())
    if (Array.isArray(arg.emits)) {
        emits = Array.from(new Set([...emits, ...arg.emits]))
    }
    option.emits = emits


    CustomRecords.forEach(rec => {
        rec.creator.apply({}, [option, rec.key])
    })

    if (arg.setup) {
        if (!option.setup) {
            option.setup = arg.setup
        } else {
            const oldSetup: OptionSetupFunction = option.setup
            const newSetup: ComponentSetupFunction = arg.setup

            const setup: ComponentSetupFunction = function (props, ctx) {
                const newRet = newSetup(props, ctx)
                const oldRet = oldSetup(props, ctx)
                if (oldRet instanceof Promise || newRet instanceof Promise) {
                    return Promise.all([newRet, oldRet]).then((arr) => {
                        return Object.assign({}, arr[0], arr[1])
                    })
                } else {

                    return Object.assign({}, newRet, oldRet)
                }

            }
            option.setup = setup
        }
    }
    if (arg.options) {
        Object.assign(option, arg.options)
    }
    if (arg.modifier) {
        arg.modifier(option)
    }
    return defineComponent(option)
}
function build(cons: Cons, option: ComponentOption) {
    const slot = obtainSlot(cons.prototype)
    slot.inComponent = true
    const superSlot = getSuperSlot(cons.prototype)
    if (superSlot) {
        if (!superSlot.inComponent) {
            throw 'Class should be decorated by Component or ComponentBase: ' + slot.master
        }
        if (superSlot.cachedVueComponent === null) {
            throw 'Component decorator 1'
        }
    }
    const component = buildComponent(cons, option, superSlot === null ? undefined : superSlot.cachedVueComponent)
    component.__vfdConstructor = cons
    slot.cachedVueComponent = component

}
function _Component(arg: ComponentConsOption, cb: (cons: Cons, option: ComponentOption) => any) {
    if (typeof arg === 'function') {
        return cb(arg, {})
    }
    return function (cons: Cons) {
        return cb(cons, arg)
    }
}
export function ComponentBase(arg: ComponentConsOption): any {
    return _Component(arg, function (cons: Cons, option: ComponentOption) {
        build(cons, option)
        return cons
    })
}

export function Component(arg: ComponentConsOption): any {
    return _Component(arg, function (cons: Cons, option: ComponentOption) {
        build(cons, option)
        return obtainSlot(cons.prototype).cachedVueComponent
    })
}
