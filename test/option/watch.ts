
import { expect } from 'chai';
import 'mocha';
import { Component, Watch, Base, toNative } from '../../dist'

@Component
class Comp extends Base {

    @Watch('defaultWatchKey')
    defaultWatcher() {
        return 'defaultWatcher test value'
    }

    @Watch('fullWatchKey', {
        deep: true,
        immediate: true,
        flush: 'post'
    })

    fullWatcher() {
        return 'fullWatcher test value'
    }
    @Watch('arrayWatchKey')
    arrayWatcher1() {
        return 'arrayWatcher1 value'
    }
    @Watch('arrayWatchKey', {
        immediate: true
    })
    arrayWatcher2() {
        return 'arrayWatcher2 value'
    }

    @Watch('multiKey1', {
        immediate: true
    })
    @Watch('multiKey2', {

    })
    multiKeyWatcher() {
        return 'multiKeyWatcher value'
    }
}
const CompContext = toNative(Comp) as any
console.log(CompContext)
describe('decorator Watch',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.watch?.defaultWatchKey?.handler)
            expect('defaultWatcher test value').to.equal(CompContext.watch.defaultWatchKey.handler())

        })
        it('full option', () => {
            expect('function').to.equal(typeof CompContext?.watch?.fullWatchKey?.handler)
            expect('fullWatcher test value').to.equal(CompContext.watch.fullWatchKey.handler())
            expect(true).to.equal(CompContext.watch.fullWatchKey.deep)
            expect(true).to.equal(CompContext.watch.fullWatchKey.immediate)
            expect('post').to.equal(CompContext.watch.fullWatchKey.flush)
        })
        it('array', () => {
            expect(true).to.equal(Array.isArray(CompContext?.watch?.arrayWatchKey))
            expect('arrayWatcher1 value').to.equal(CompContext.watch.arrayWatchKey[0].handler())
            expect(true).to.equal(CompContext.watch.arrayWatchKey[1].immediate)
        })
        it('method', () => {
            expect('function').to.equal(typeof CompContext?.methods?.defaultWatcher)
            expect('defaultWatcher test value').to.equal(CompContext.methods.defaultWatcher())
        })
        it('multi key', () => {
            expect('function').to.equal(typeof CompContext?.watch?.multiKey1?.handler)
            expect('function').to.equal(typeof CompContext?.watch?.multiKey2?.handler)
            expect(true).to.equal(CompContext.watch.multiKey1.handler === CompContext.watch.multiKey2.handler)
            expect(true).to.equal(!!CompContext.watch.multiKey1.immediate)
            expect(false).to.equal(!!CompContext.watch.multiKey2.immediate)
        })
    }
)
export default {}