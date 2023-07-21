
import { expect } from 'chai';
import 'mocha';
import { Component, Base, Setup } from '../dist'
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
  modifier: function (option: any) {
    option.modifierCalled = true
    return option
  },
  render() {
    return 'render value'
  },
  options: {
    test: 'test value'
  },
  template: 'template string',
  mixins: [{
    methods: {
      mixinMethod() {

      }
    }
  }],
  setup() {
    return Promise.resolve({
      setupA: 'setupVA'
    })
  }
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
        } else if (key === 'beforeCreate' && typeof EmptyContext[key] === 'function') {
          expect(true).to.equal(isEmptyObject(EmptyContext[key]()))
        } else if (key === '__vfdConstructor') {
          expect('function').to.equal(typeof EmptyContext[key])
        } else if (key === 'name') {
            expect(EmptyContext[key]).to.equal('Empty')
        } else {

          expect(true).to.equal(isEmptyObject(EmptyContext[key]))
        }
      })
    })
    it('Full option', async () => {
      expect('object').to.equal(typeof FullOptionContext)
      for (const key of Object.keys(FullOptionOpt)) {
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
            break
          case 'setup':
            const pro = FullOptionContext['setup']()
            expect(true).to.equal( pro instanceof Promise)
            const r = await pro
            expect('setupVA').to.equal(r.setupA)
            break
          default:
            expect(opt).to.equal(FullOptionContext[key])
        }
      }
    })
  }
)
export default {}
