import type { Ref, SetupContext, ShallowUnwrapRef } from 'vue';
import type { Cons } from '../component'
import type { OptionBuilder } from '../optionBuilder'
import { getValidNames } from '../utils'

const isPromise = (v: any) => typeof v === 'object' && typeof v.then === 'function' 

export function build(cons: Cons, optionBuilder: OptionBuilder): Record<string, any> {
    const setupData: Record<string, any> = {};
    
    optionBuilder.setup = (props, ctx) => {
        const sample = new cons(optionBuilder, ctx)

        let promise: Promise<any> | null = null;

        const names = getValidNames(sample, (des) => {
            return !!des.enumerable
        })
        for (const name of names) {
            const value = (sample as any)[name]
            const keys = Object.keys(value ?? {})
            if (keys.length === 1 && keys[0] === '__vueFacingDecoratorDeferredSetup') {
                const setupState = value.__vueFacingDecoratorDeferredSetup(props, ctx)
                if (isPromise(setupState)) {
                    if (!promise) {
                        promise = Promise.resolve(setupState)
                    }
                    promise = promise.then(() => {
                        return setupState.then((value: any) => {
                            setupData[name] = value
                        })
                    })
                } else {
                    setupData[name] = setupState
                }
            }
        }
        return promise ?? {};
    }
    return setupData;
}

export type UnwrapSetupValue<T> = T extends Ref<infer R>
    ? R
    : ShallowUnwrapRef<T>

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T

export function setup<R = any>(setupFn: (this: void, props: Readonly<any>, ctx: SetupContext<any>) => R): UnwrapSetupValue<UnwrapPromise<R>> {
    return {
        __vueFacingDecoratorDeferredSetup: setupFn
    } as UnwrapSetupValue<UnwrapPromise<R>>
}
