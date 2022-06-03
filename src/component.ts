import { defineComponent } from 'vue';
import { build as optionComputed } from './option/computed'
import { build as optionData } from './option/data'
import { build as optionMethodsAndLifecycle } from './option/methodsAndLifecycle'
import { build as optionRef } from './option/ref'
export interface OptionBuilder {
    data?: Record<string, any>
    methods?: Record<string, Function>
    lifecycle?: Record<string, Function>
    computed?: Record<string, any>
}
export interface Cons { new(): any, prototype: any }
export function Component(cons: Cons) {
    const optionBuilder: OptionBuilder = {}
    optionComputed(cons,optionBuilder)
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
        ...optionBuilder.lifecycle
    }
    const def = defineComponent(raw)
    return def as any
}