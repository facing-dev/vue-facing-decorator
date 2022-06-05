
import { expect } from 'chai';
import 'mocha';
import { Component, Base } from '../dist'
import { isEmptyObject } from './utils';
@Component
export class Empty extends Base {

}
const EmptyContext = Empty as any
describe('Component',
  () => describe('Empty', () => {
    it('Should be empty', () => {
      Object.keys(EmptyContext).forEach(key => {
        if(key==='data' && typeof EmptyContext[key]==='function'){
          expect(true).to.equal(isEmptyObject(EmptyContext[key]()))
        }else{
          expect(true).to.equal(isEmptyObject(EmptyContext[key]))
        }
      })
    })
  })
)

export default {}