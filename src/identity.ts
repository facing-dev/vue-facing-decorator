export const IdentitySymbol: unique symbol = Symbol('vue-facing-decorator-identity')

export type IdentityType = {
    props: Record<string, any>
    events: Record<string, any>
}

type AssertIs<O, T extends O> = T

export interface Identity<T extends IdentityType = IdentityType> {
    [IdentitySymbol]: T
}

type MergeRecord<N extends Record<string, any>, O extends Record<string, any>> = {
    [I in (keyof N) | (keyof O)]: I extends keyof N ? N[I] : I extends keyof O ? O[I] : never
}

export type MergeIdentityType<N extends IdentityType, O extends IdentityType> = AssertIs<
    IdentityType,
    {
        props: MergeRecord<N['props'], O['props']>
        events: MergeRecord<N['events'], O['events']>
    }
>

