
import { expect } from 'chai';
import 'mocha';

import { Component, Ref, Base, toNative } from '../../dist/esm'

import { mount } from '@vue/test-utils';


@Component
class Comp extends Base {
    @Ref
    readonly refName!: any

    @Ref('override')
    readonly foo!: any
}
const CompContext = toNative(Comp) as any

describe('decorator Ref',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.beforeCreate)
        })

        it('points to an element', () => {
            const component = mount({
                ...CompContext,
                template: `
                    <div>
                        <div ref="refName">ref content</div>
                        <div ref="override">foo</div>
                    </div>
                `,
            })

            expect(component.vm.refName.textContent).to.equal('ref content');
            expect(component.vm.foo.textContent).to.equal('foo');
        });
    }
)

export default {}
