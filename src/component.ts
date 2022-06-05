import { defineComponent } from 'vue';
import { obtainSlot, toBaseReverse } from './utils'
import { build as optionComputed } from './option/computed'
import { build as optionData } from './option/data'
import { build as optionMethodsAndLifecycle } from './option/methodsAndLifecycle'
import { build as optionRef } from './option/ref'
import { build as optionWatch, WatchConfig } from './option/watch'
import { build as optionProps, PropsConfig } from './option/props'
import { build as optionInject, InjectConfig } from './option/inject'
import { build as optionEmit } from './option/emit'
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
    optionEmit(cons, optionBuilder)
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
        inject: optionBuilder.inject,
        ...optionBuilder.lifecycle
    }
    return raw as any
}

export function Component(arg: Cons | {
    name?: string
    emits?: string[]
    provide?: Record<string, any> | Function
    components?: Record<string, any>
    directives?: Record<string, any>;
    inheritAttrs?: boolean;
    expose?: string[];
    modifier?: (raw: any) => any
}): any {
    if (typeof arg === 'function') {
        return defineComponent(ComponentOption(arg))
    }
    return function (cons: Cons) {
        let option = ComponentOption(cons)
        const slot = obtainSlot(cons.prototype)
        if (typeof arg.name !== 'undefined') {
            option.name = arg.name
        }

        let emits = Array.from(slot.obtainMap('emits').keys())
        if (Array.isArray(arg.emits)) {
            emits = Array.from(new Set([...emits,...arg.emits]))
        }
        option.emits = emits


        if (arg.components) {
            option.components = arg.components
        }
        if (arg.provide) {
            option.provide = arg.provide
        }
        if (arg.directives) {
            option.directives = arg.directives
        }
        if (arg.inheritAttrs) {
            option.inheritAttrs = arg.inheritAttrs
        }
        if (arg.expose) {
            option.expose = arg.expose
        }
        if (arg.modifier) {
            option = arg.modifier(option)
        }

        return defineComponent(option)
    }
}