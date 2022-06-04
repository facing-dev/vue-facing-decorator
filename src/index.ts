
export { Component } from './component'
export { decorator as Ref } from './option/ref'
export { decorator as Watch } from './option/watch'
export { decorator as Prop } from './option/props'
export { decorator as Inject } from './option/inject'
import type {
    ComponentInternalInstance,
    ComponentPublicInstance,
    Slots,
    nextTick,
    WatchOptions,
    WatchStopHandle,

} from 'vue'

// export declare class Base {

//     $: ComponentInternalInstance;
//     $data: any//D;
//     $props: any//MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults> : P & PublicProps;
//     $attrs: any//Data;
//     $refs: any//Data;
//     $slots: Slots;
//     $root: ComponentPublicInstance | null;
//     $parent: ComponentPublicInstance | null;
//     $emit: any// EmitFn<E>;
//     $el: any;
//     $options: any//Options & MergedComponentOptionsOverride;
//     $forceUpdate: () => void;
//     $nextTick: typeof nextTick;
//     $watch: { (source: string | Function, cb: Function, options?: WatchOptions): WatchStopHandle };

// }

export class Base {

    $!: ComponentInternalInstance;
    $data!: any//D;
    $props!: any//MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults> : P & PublicProps;
    $attrs!: any//Data;
    $refs!: any//Data;
    $slots!: Slots;
    $root!: ComponentPublicInstance | null;
    $parent!: ComponentPublicInstance | null;
    $emit!: any// EmitFn<E>;
    $el!: any;
    $options!: any//Options & MergedComponentOptionsOverride;
    $forceUpdate!: () => void;
    $nextTick!: typeof nextTick;
    $watch!: { (source: string | Function, cb: Function, options?: WatchOptions): WatchStopHandle };


    beforeCreate?(): void;
    created?(): void;
    beforeMount?(): void;
    mounted?(): void;
    beforeUpdate?(): void;
    updated?(): void;
    activated?(): void;
    deactivated?(): void;
    /** @deprecated use `beforeUnmount` instead */
    beforeDestroy?(): void;
    beforeUnmount?(): void;
    /** @deprecated use `unmounted` instead */
    destroyed?(): void;
    unmounted?(): void;
    renderTracked?(e: any): void;
    renderTriggered?(e: any): void;
    errorCaptured?(err: any, instance: ComponentPublicInstance | null, info: string): boolean | void;
}