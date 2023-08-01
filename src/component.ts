import { defineComponent, type ComponentCustomOptions } from 'vue';
import { obtainSlot, getSuperSlot, getProviderFunction } from './utils'
import { build as optionSetup } from './option/setup'
import { build as optionComputed } from './option/computed'
import { build as optionData } from './option/data'
import { build as optionMethodsAndHooks } from './option/methodsAndHooks'
import { build as optionRef } from './option/ref'
import { build as optionWatch } from './option/watch'
import { build as optionProps } from './option/props'
import { build as optionInject } from './option/inject'
import { build as optionProvide } from './option/provide'
import { build as optionEmit } from './option/emit'
import { build as optionVModel } from './option/vmodel'
import { build as optionAccessor } from './option/accessor'
import type { SetupContext } from 'vue';
import type { OptionBuilder } from './optionBuilder'
import type { VueCons } from './index'
import * as DecoratorCompatible from './deco3/utils'
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
    optionAccessor(cons, optionBuilder)
    optionMethodsAndHooks(cons, optionBuilder)//the last one
    const raw = {
        name: cons.name,
        setup: optionBuilder.setup,
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
        provide() {
            optionProvide(cons, optionBuilder, this)
            return optionBuilder.provide ?? {}
        },
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
        if (['options', 'modifier', 'emits', 'setup', 'provide'].includes(name)) {
            return option
        }
        option[name] = arg[name as keyof ComponentOption]
        return option
    }, option)

    //apply event emits
    let emits = Array.from(slot.obtainMap('emits').keys())
    if (Array.isArray(arg.emits)) {
        emits = Array.from(new Set([...emits, ...arg.emits]))
    }
    option.emits = emits

    //merge setup function
    if (!option.setup) {
        option.setup = arg.setup
    } else {

        const oldSetup: OptionSetupFunction = option.setup
        const newSetup: ComponentSetupFunction = arg.setup ?? function () { return {} }

        const setup: ComponentSetupFunction = function (props, ctx) {
            const newRet = newSetup(props, ctx)
            const oldRet = oldSetup(props, ctx)
            if (oldRet instanceof Promise || newRet instanceof Promise) {
                return Promise.all([newRet, oldRet]).then((arr) => {
                    const ret = Object.assign({}, arr[0], arr[1])
                    return ret
                })
            } else {

                const ret = Object.assign({}, newRet, oldRet)
                return ret
            }

        }
        option.setup = setup
    }

    //merge provide function
    const oldProvider = getProviderFunction(option.provide)
    const newProvider = getProviderFunction(arg.provide)
    option.provide = function() {
        return Object.assign({}, oldProvider.call(this), newProvider.call(this))
    }

    //custom decorator
    const map = slot.getMap('customDecorator')
    if (map && map.size > 0) {
        map.forEach((v) => {
            v.creator.apply({}, [option, v.key])
        })
    }

    //shallow merge options
    if (arg.options) {
        Object.assign(option, arg.options)
    }

    //apply modifier
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
    slot.cachedVueComponent = component;
    (cons as any).__vccOpts = component
}
function _Component(cb: (cons: Cons, option: ComponentOption) => any, arg: ComponentConsOption, ctx?: ClassDecoratorContext) {
    if (typeof arg === 'function') {
        return DecoratorCompatible.compatibleClassDecorator(function (cons: Cons) {
            return cb(cons, {})
        })(arg, ctx)
    }
    return DecoratorCompatible.compatibleClassDecorator(function (cons: Cons) {
        return cb(cons, arg)
    })
}
export function ComponentBase(arg: ComponentConsOption, ctx?: ClassDecoratorContext): any {
    return _Component(function (cons: Cons, option: ComponentOption) {
        build(cons, option)
        return cons
    }, arg, ctx)
}

export const Component = ComponentBase

export function toNative<T extends Cons>(cons: T): T {
    const slot = obtainSlot(cons.prototype)
    if (!slot.inComponent) {
        throw 'to native 1'
    }
    const cached = slot.cachedVueComponent
    if (!cached) {
        throw 'to native 2'
    }
    return cached
}
