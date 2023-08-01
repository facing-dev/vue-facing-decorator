
import { expect } from 'chai';
import 'mocha';
import { Component, Provide, Base, Inject } from '../../dist'
import {VueWrapper, mount} from '@vue/test-utils';

describe('decorator Provide',
    () => {
        @Component({
            template: '<div><slot/></div>',
            provide: {
                fromClassDecorator: 'provided from class decorator'
            },
        })
        class Parent extends Base {
            @Provide
            readonly foo = 'provided foo'

            @Provide
            readonly foo2 = this.foo

            @Provide('overridden')
            readonly _internalName = 123
        }

        @Component({template: '<span />'})
        class Child extends Base {
            @Inject
            readonly fromClassDecorator!: string

            @Inject
            readonly foo!: string

            @Inject
            readonly foo2!: string

            @Inject
            readonly overridden!: number
        }

        let child: VueWrapper<Child>;

        beforeEach(() => {
            const component = mount({
                template: `
                    <Parent>
                        <Child />
                    </Parent>
                `,
                components: {
                    Parent,
                    Child,
                }
            })
            child = component.findComponent(Child)
        })

        it('@Component decorator', () => {
            expect(child.vm.fromClassDecorator).to.equal('provided from class decorator')
        })

        it('default key', () => {
            expect(child.vm.foo).to.equal('provided foo')
        })

        it('accessing this', () => {
            expect(child.vm.foo2).to.equal('provided foo')
        })

        it('custom key', () => {
            expect(child.vm).to.not.have.property('_internalName')
            expect(child.vm.overridden).to.equal(123)
        })

        it('prioritises the class decorator', () => {
            @Component({
                template: '<div><slot/></div>',
                provide: {
                    ambiguous: 'class'
                },
            })
            class Parent extends Base {
                @Provide
                readonly ambiguous = 'property'
            }

            @Component({template: '<span />'})
            class Child extends Base {
                @Inject
                readonly ambiguous!: string
            }

            const component = mount({
                template: `
                    <Parent>
                        <Child />
                    </Parent>
                `,
                components: {
                    Parent,
                    Child,
                }
            })
            const child = component.findComponent(Child)

            expect(child.vm.ambiguous).to.equal('class')
        })
    }
)
