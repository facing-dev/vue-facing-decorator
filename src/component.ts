import { defineComponent, type ComponentCustomOptions, type MethodOptions } from 'vue';
import { obtainSlot, getSuperSlot, getProviderFunction, optionNullableClassDecorator } from './utils'
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
import type { VueCons } from './class'
type SetupFunction<T> = (this: void, props: Readonly<any>, ctx: SetupContext<any>) => T | Promise<T>
export type OptionSetupFunction = SetupFunction<any>
export type ComponentSetupFunction = SetupFunction<Record<string, any>>
function ComponentOption(cons: VueCons, extend?: any) {
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
    methods?: MethodOptions
}

function buildComponent(cons: VueCons, arg: ComponentOption, extend?: any): any {
    const option = ComponentOption(cons, extend)
    const slot = obtainSlot(cons.prototype)
    Object.keys(arg).reduce<Record<string, any>>((option, name: string) => {
        if (['options', 'modifier', 'methods', 'emits', 'setup', 'provide'].includes(name)) {
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

    //merge methods
    if ('object' === typeof arg.methods && !Array.isArray(arg.methods) && arg.methods !== null) {
        option.methods ??= {}
        Object.assign(option.methods, arg.methods);
    }

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
                    return Object.assign({}, arr[0], arr[1])
                })
            } else {
                return Object.assign({}, newRet, oldRet)
            }
        }

        option.setup = setup
    }

    //merge provide function
    const oldProvider = getProviderFunction(option.provide)
    const newProvider = getProviderFunction(arg.provide)
    option.provide = function () {
        return Object.assign({}, oldProvider.call(this), newProvider.call(this))
    }

    //custom decorator
    const map = slot.getMap('customDecorator')
    if (map && map.size > 0) {
        map.forEach((v) => {
            v.forEach(ite => ite.creator.apply({}, [option, ite.key]))
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
function build(cons: VueCons, option: ComponentOption) {
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

export const ComponentBase = optionNullableClassDecorator((cons: VueCons, option?: ComponentOption) => {
    build(cons, option ?? {})
})

export function toNative<T extends VueCons>(cons: T): T {
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
