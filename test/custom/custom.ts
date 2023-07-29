
import { expect } from 'chai';
import 'mocha';
import { Component, Base, createDecorator,toNative } from '../../dist'

function CustomDeco(param?: String) {
    return createDecorator(function (options: any, key: string) {
        options.methods ??= {}
        const old: Function = options.methods[key]
        if (!old) {
            throw 'method not found'
        }
        options.methods[key] = function (...args: any[]) {
            return `${old.apply(this, args)} ${param}`
        }
    },{
        preserve:true
    })
}

@Component
class Comp extends Base {
    @CustomDeco('DecoParam')
    method(this: any, param: string) {
        this.contextKey = 'contextValue'
        return `method return value ${param}`
    }
}

const CompContext = toNative(Comp) as any

describe('create decorator',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof (CompContext.methods?.method))
            const context: any = {}
            const ret = CompContext.methods?.method.apply(context, ['Param'])
            expect('contextValue').to.equal(context.contextKey)
            expect('method return value Param DecoParam').to.equal(ret)
        })
    }
)
export default {}