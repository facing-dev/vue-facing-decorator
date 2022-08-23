import { defineComponent, ComponentCustomOptions } from 'vue';
import { obtainSlot, getSuperSlot, getSlot } from './utils'
import { build as optionComputed } from './option/computed'
import { build as optionData } from './option/data'
import { build as optionMethodsAndLifecycle } from './option/methodsAndLifecycle'
import { build as optionRef } from './option/ref'
import { build as optionWatch, WatchConfig } from './option/watch'
import { build as optionProps, PropsConfig } from './option/props'
import { build as optionInject, InjectConfig } from './option/inject'
import { build as optionEmit } from './option/emit'
import { build as optionVModel, VModelConfig } from './option/vmodel'
import { build as optionAccessor } from './option/accessor'
import { OptionBuilder } from './optionBuilder'

export interface Cons { new(): any, prototype: any }
function ComponentOption(cons: Cons, extend?: any) {
    const optionBuilder: OptionBuilder = {}
    optionVModel(cons, optionBuilder)
    optionComputed(cons, optionBuilder)//after VModel
    optionWatch(cons, optionBuilder)
    optionProps(cons, optionBuilder)
    optionInject(cons, optionBuilder)
    optionEmit(cons, optionBuilder)
    optionRef(cons, optionBuilder)//after Computed
    optionMethodsAndLifecycle(cons, optionBuilder)//after Ref Computed
    optionAccessor(cons, optionBuilder)
    const raw = {
        data() {
            const optionBuilder: OptionBuilder = {}
            optionData(cons, optionBuilder)
            return optionBuilder.data ?? {}
        },
        methods: optionBuilder.methods,
        computed: optionBuilder.computed,
        watch: optionBuilder.watch,
        props: optionBuilder.props,
        inject: optionBuilder.inject,
        ...optionBuilder.lifecycle,
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
}
type ComponentConsOption = Cons | ComponentOption
function buildComponent(cons: Cons, arg: ComponentOption, extend?: any): any {
    let option = ComponentOption(cons, extend)
    const slot = obtainSlot(cons.prototype)
    Object.keys(arg).reduce<Record<string, any>>((option, name: string) => {
        if (['options', 'modifier', 'emits'].includes(name)) {
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
        // const slot = getSlot(cons.prototype)!
        // Object.defineProperty(cons, '__vccOpts', {
        //     value: slot.cachedVueComponent
        // })
        // console.log('kkkk', '__vccOpts' in cons, cons)
        // return cons
        let ff =  obtainSlot(cons.prototype).cachedVueComponent

        return ff
    })

}