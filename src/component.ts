import { defineComponent } from 'vue';
import { toBaseReverse } from './utils'
import { build as optionComputed } from './option/computed'
import { build as optionData } from './option/data'
import { build as optionMethodsAndLifecycle } from './option/methodsAndLifecycle'
import { build as optionRef } from './option/ref'
import { build as optionWatch, WatchConfig } from './option/watch'
import { build as optionProps, PropsConfig } from './option/props'
import { build as optionInject, InjectConfig } from './option/inject'
export interface OptionBuilder {
    name?: string
    data?: Record<string, any>
    methods?: Record<string, Function>
    lifecycle?: Record<string, Function>
    computed?: Record<string, any>
    watch?: Record<string, WatchConfig>
    props?: Record<string, PropsConfig>
    inject?: Record<string, InjectConfig>
}
export interface Cons { new(): any, prototype: any }
function ComponentOption(cons: Cons) {
    const optionBuilder: OptionBuilder = {}
    optionComputed(cons, optionBuilder)
    optionWatch(cons, optionBuilder)
    optionProps(cons, optionBuilder)
    optionInject(cons, optionBuilder)
    optionMethodsAndLifecycle(cons, optionBuilder)
    optionRef(cons, optionBuilder)

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
        inject:optionBuilder.inject,
        ...optionBuilder.lifecycle
    }
    return raw as any
}

export function Component(arg: Cons | {
    name?: string
    emits?: string[]
    provide?: Record<string, any> | Function
    modifier?: (raw: any) => any
}): any {
    if (typeof arg === 'function') {
        return defineComponent(ComponentOption(arg))
    }
    return function (cons: Cons) {
        let option = ComponentOption(cons)
        if (typeof arg.name !== 'undefined') {
            option.name = arg.name
        }
        if (Array.isArray(arg.emits)) {
            option.emits = arg.emits
        }
        if (arg.provide) {
            option.provide = arg.provide
        }


        if (arg.modifier) {
            option = arg.modifier(option)
        }

        return defineComponent(option)
    }
}