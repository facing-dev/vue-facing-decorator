import { TSX, Prop, Emit, Component, Vue, toNative } from 'vue-facing-decorator'

interface Props {
    propString: string
}

interface Events {
    myEvent: Function
    myEvent2: string
}

@Component
class MyComponent extends TSX<Props, Events>()(Vue) {
    @Prop({
        required: true
    })
    propString!: string
    @Emit('myEvent')
    triggerMyEvent() {
        return 'event value'
    }
    @Emit('myEvent2')
    triggerMyEvent2() {
        return 'event2 value'
    }
}

const Comp = toNative(MyComponent)

//TypeScript will check component attributes in TSX.
function render() {
    return <Comp propString='foobar' onMyEvent={(v: string) => { }} onMyEvent2={(v: string) => { }}></Comp>
}
