
export { Component } from './component'
import { ComponentInternalInstance, ComponentPublicInstance, Slots, nextTick, WatchOptions, WatchStopHandle } from 'vue'

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

}