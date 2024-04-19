import { TSX, Prop, Emit, Component, Vue, toNative } from 'vue-facing-decorator'

interface BaseProps {
    propNumber: number
}

interface BaseEvents {
    baseEvent: Function
}

@Component
class MyBaseComponent extends TSX<BaseProps, BaseEvents>()(Vue) implements BaseProps {
    @Prop({
        required: true
    })
    propNumber!: number
    @Emit('baseEvent')
    triggerBaseEvent() {
        return 'baseEvent value'
    }
}

interface Props {
    propString: string
}

interface Events {
    event: Function
}

@Component
class MyComponent extends TSX<Props, Events>()(MyBaseComponent) implements Props {
    @Prop({
        required: true
    })
    propString!: string
    @Emit('event')
    triggerEvent() {
        return 'event value'
    }
}

const Comp = toNative(MyComponent)

function render() {
    return <Comp propString='foobar' propNumber={1} onBaseEvent={() => { }} onEvent={() => { }}></Comp>
}
