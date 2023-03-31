import { TSX, Prop, Emit, Component, ComponentBase, Vue } from 'vue-facing-decorator'

interface BaseProps {
    propNumber: number
}

interface BaseEvents {
    baseEvent: Function
}

@ComponentBase
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
export default class MyComponent extends TSX<Props, Events>()(MyBaseComponent) implements Props {
    @Prop({
        required: true
    })
    propString!: string
    @Emit('event')
    triggerEvent() {
        return 'event value'
    }
}

function render() {
    return <MyComponent propString='foobar' propNumber={1} onBaseEvent={() => { }} onEvent={() => { }}></MyComponent>
}
