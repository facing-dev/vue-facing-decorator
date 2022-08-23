import { WatchConfig } from './option/watch'
import { PropsConfig } from './option/props'
import { InjectConfig } from './option/inject'
export interface OptionBuilder {
    name?: string
    data?: Record<string, any>
    methods?: Record<string, Function>
    lifecycle?: Record<string, Function>
    computed?: Record<string, any>
    watch?: Record<string, WatchConfig | WatchConfig[]>
    props?: Record<string, PropsConfig>
    inject?: Record<string, InjectConfig>
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
// export function applyGetters(optionBuilder: OptionBuilder, dataFunc: (ctx: any) => Map<string, () => any>) {
//     optionBuilder.beforeCreateCallbacks ??= []
//     optionBuilder.beforeCreateCallbacks.push(function (this: any) {
//         const ctx = this
//         const data = dataFunc(ctx)
//         data.forEach((v, n) => {
//             Object.defineProperty(ctx, n, {
//                 get: v
//             })
//         })
//     })
// }

// export function applySetters(optionBuilder: OptionBuilder, dataFunc: (ctx: any) => Map<string, (v:any) => any>) {
//     optionBuilder.beforeCreateCallbacks ??= []
//     optionBuilder.beforeCreateCallbacks.push(function (this: any) {
//         console.log('sdf',this)
//         const ctx = this
//         const data = dataFunc(ctx)
//         data.forEach((v, n) => {
//             Object.defineProperty(ctx, n, {
//                 set: v
//             })
//         })
//     })
// }