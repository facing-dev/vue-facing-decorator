import type { WatchConfig } from './option/watch'
import type { PropsConfig } from './option/props'
import type { InjectConfig } from './option/inject'
import type { OptionSetupFunction } from './component'
export interface OptionBuilder {
    name?: string
    // setup?: (this: void, props: Readonly<any>, ctx: SetupContext<any>) => Promise<any> | any | RenderFunction | void
    data?: Record<string, any>
    methods?: Record<string, Function>
    hooks?: Record<string, Function>
    computed?: Record<string, any>
    watch?: Record<string, WatchConfig | WatchConfig[]>
    props?: Record<string, PropsConfig>
    inject?: Record<string, InjectConfig>
    setup?: OptionSetupFunction
    beforeCreateCallbacks?: Function[]
}

export function applyAccessors(optionBuilder: OptionBuilder, dataFunc: (ctx: any) => Map<string, { get: (() => any) | undefined, set: ((v: any) => any) | undefined }>) {
    optionBuilder.beforeCreateCallbacks ??= []
    optionBuilder.beforeCreateCallbacks.push(function (this: any) {
        const ctx = this
        const data = dataFunc(ctx)
        data.forEach((v, n) => {
            Object.defineProperty(ctx, n, v)
        })
    })
}
