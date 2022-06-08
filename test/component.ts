
import { expect } from 'chai';
import 'mocha';
import { Component, Base } from '../dist'
import { isEmptyObject } from './utils';
@Component
export class Empty extends Base {

}
const EmptyContext = Empty as any

const FullOptionOpt = {
  name: 'FullOption',
  emits: ['emits1', 'emits2'],
  provide: function () {
    return 'provided'
  },
  components: {
    empty: Empty
  },
  directives: {
    directive: {
      directiveFlag: {}
    }
  },
  inheritAttrs: true,
  expose: ['expose1', 'expose2'],
  modifier(option: any) {
    option.modifierCalled=true
    return option
  },
  render() {
    return 'render value'
  },
  options: {
    test: 'test value'
  },
  template:'template string'
}

@Component(FullOptionOpt)
export class FullOption extends Base {

}
const FullOptionContext = FullOption as any
describe('Component',
  () => {
    it('Empty', () => {
      expect('object').to.equal(typeof EmptyContext)
      Object.keys(EmptyContext).forEach(key => {
        if (key === 'data' && typeof EmptyContext[key] === 'function') {
          expect(true).to.equal(isEmptyObject(EmptyContext[key]()))
        } else {
          expect(true).to.equal(isEmptyObject(EmptyContext[key]))
        }
      })
    })
    it('Full option', () => {
      expect('object').to.equal(typeof FullOptionContext)
      Object.keys(FullOptionOpt).forEach(key => {
        const opt = (FullOptionOpt as any)[key]
        switch (key) {
          case 'emits':
            expect(opt.join(',')).to.equal(FullOptionContext[key].join(','))
            break;
          case 'render':
            expect('render value').to.equal(FullOptionContext[key]())
            break;
          case 'options':
            expect(opt.test).to.equal(FullOptionContext['test'])
            break;
          case 'modifier':
            expect(true).to.equal(FullOptionContext['modifierCalled'])
            return;
          default:
            expect(opt).to.equal(FullOptionContext[key])
        }
      })
    })
  }
)
export default {}