
import { expect } from 'chai';
import 'mocha';
import { Component, Watch, Base } from '../../dist'

@Component
export class Comp extends Base {
    
    @Watch('defaultWatchKey')
    defaultWatcher(){
        return 'defaultWatcher test value'
    }

    @Watch('fullWatchKey',{
        deep:true,
        immediate:true,
        flush:'post'
    })
    fullWatcher(){
        return 'fullWatcher test value'
    }
}
const CompContext = Comp as any

describe('decorator Watch',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.watch?.defaultWatchKey?.handler)
            expect('defaultWatcher test value').to.equal(CompContext.watch.defaultWatchKey.handler())
   
        })
        it('full option',()=>{
            expect('function').to.equal(typeof CompContext?.watch?.fullWatchKey?.handler)
            expect('fullWatcher test value').to.equal(CompContext.watch.fullWatchKey.handler())
            expect(true).to.equal(CompContext.watch.fullWatchKey.deep)
            expect(true).to.equal(CompContext.watch.fullWatchKey.immediate)
            expect('post').to.equal(CompContext.watch.fullWatchKey.flush)
        })
        it('method',()=>{
            expect('function').to.equal(typeof CompContext?.methods?.defaultWatcher)
            expect('defaultWatcher test value').to.equal(CompContext.methods.defaultWatcher())
        })
    }
)
export default {}