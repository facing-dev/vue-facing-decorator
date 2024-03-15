
import { expect } from 'chai';
import 'mocha';
import { Component, Provide, Base, Inject, toNative } from '../../dist/esm'
import { VueWrapper, mount } from '@vue/test-utils';
import { Ref, computed, ref } from 'vue';

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
            foo = 'provided foo'

            @Provide
            readonly foo2 = this.foo

            @Provide('overridden')
            readonly _internalName = 123

            @Provide
            get getter() {
                return 'from getter'
            }
        }

        @Component({ template: '<span />' })
        class Child extends Base {
            @Inject
            readonly fromClassDecorator!: string

            @Inject
            readonly foo!: string

            @Inject
            readonly foo2!: string

            @Inject
            readonly overridden!: number

            @Inject
            readonly getter!: string
        }

        let parent: VueWrapper<Parent>;
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
            }, {
                global: {
                    config: {
                        unwrapInjectedRef: true,
                    },
                },
            })
            parent = component.findComponent(Parent)
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

        it('getter', () => {
            expect(child.vm.getter).to.equal('from getter')
        })

        it('honours reactivity', async () => {
            expect(parent.vm.foo).to.equal('provided foo')
            expect(child.vm.foo).to.equal('provided foo')

            parent.vm.foo = 'bar'
            expect(child.vm.foo).to.equal('bar')
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

            @Component({ template: '<span />' })
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

        it('preserve feild', () => {
            @Component({
                template: '<div><slot/></div>',
            })
            class Comp extends Base {
                @Provide
                readonly vp = 'foo'
                v!: string

                @Provide
                fp() { }
                f!: Function
                mounted() {

                    this.v = this.vp
                    this.f = this.fp

                }


            }


            const component = mount(toNative(Comp) as any)

            expect(component.vm.v).to.equal('foo')
            expect(typeof component.vm.f).to.equal('function')
        })
    }
)
