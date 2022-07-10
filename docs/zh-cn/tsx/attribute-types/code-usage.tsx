import { TSX, Prop, Emit, Component, Vue } from 'vue-facing-decorator'

interface Props {
    propString: string
}

interface Events {
    myEvent: Function
}

@Component
export default class MyComponent extends TSX<Props, Events>()(Vue) {
    @Prop({
        required: true
    })
    propString!: string
    @Emit('myEvent')
    triggerMyEvent() {
        return 'event value'
    }
}

//TypeScript will check component attributes in TSX.
function render() {
    return <MyComponent propString='foobar' onMyEvent={(v: string) => { }}></MyComponent>
}
