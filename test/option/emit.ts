
import { expect } from 'chai';
import 'mocha';
import { Component, Emit, Base } from '../../dist'

@Component
export class Comp extends Base {
    @Emit()
    defaultEmit() {
        return 'defaultEmit value'
    }

    @Emit('CustomName')
    customNameEmit() {
        return 'customNameEmit value'
    }

    @Emit()
    promiseEmit() {
        return new Promise((res) => {

            res('promiseEmit value')


        })
    }

}
const CompContext = Comp as any

describe('decorator Emit',
    () => {
        it('emits', () => {
            expect(true).to.equal(Array.isArray(CompContext.emits))
            expect(true).to.equal(CompContext.emits.includes('defaultEmit'))
        })
        it('default', () => {
            expect('function').to.equal(typeof CompContext.methods?.defaultEmit)
            let emitName: any = ''
            let emitValue: any = ''
            CompContext.methods.defaultEmit.apply({
                $emit(n: string, v: string) {
                    emitName = n
                    emitValue = v
                }
            })
            expect(emitName).to.equal('defaultEmit')
            expect(emitValue).to.equal('defaultEmit value')
        })
        it('custom name', () => {
            expect('function').to.equal(typeof CompContext.methods?.customNameEmit)
            let emitName: any = ''
            let emitValue: any = ''
            CompContext.methods.customNameEmit.apply({
                $emit(n: string, v: string) {
                    emitName = n
                    emitValue = v
                }
            })
            expect(emitName).to.equal('CustomName')
            expect(emitValue).to.equal('customNameEmit value')
        })
        it('return promise', async () => {
            expect('function').to.equal(typeof CompContext.methods?.promiseEmit)
            let emitName: any = ''
            let emitValue: any = ''
            await CompContext.methods.promiseEmit.apply({
                $emit(n: string, v: string) {
                    emitName = n
                    emitValue = v
                }
            })
            expect(emitName).to.equal('promiseEmit')
            expect(emitValue).to.equal('promiseEmit value')
        })
    }
)
export default {}