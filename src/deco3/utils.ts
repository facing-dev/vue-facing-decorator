import { obtainSlot } from '../utils'
export const Compatible: {
    fakePrototype?: any,

} = {

}
export function compatibleClassDecorator(deco: Function) {
    return function (arg: any, ctx?: DecoratorContext) {

        if (ctx) {//stage 3

            if (ctx.kind !== 'class') {
                throw 'deco stage 3 class'
            }
            const proto = Compatible.fakePrototype ??= {}
            const slot = obtainSlot(proto)
            delete Compatible.fakePrototype

            obtainSlot(arg.prototype, slot)
            const ret = deco(arg)

            return ret
        }
        else {

            return deco(arg)
        }
    }
}

export function compatibleMemberDecorator(deco: Function) {
    return function (arg: any, ctx: DecoratorContext | string) {
        if (typeof ctx === 'object') {//stage 3
            const proto = Compatible.fakePrototype ??= {}
            return deco(proto, ctx.name)
        } else {
            return deco(arg, ctx)
        }
    }
}