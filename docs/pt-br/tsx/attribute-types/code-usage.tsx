import { TSX, Prop, Emit, Component, Vue } from 'vue-facing-decorator'

interface Props {
    propString: string
}

interface Events {
    myEvent: Function
    myEvent2: string
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
    @Emit('myEvent2')
    triggerMyEvent2() {
        return 'event2 value'
    }
}

//TypeScript vai validar os atributos do componente em TSX.
function render() {
    return <MyComponent propString='foobar' onMyEvent={(v: string) => { }} onMyEvent2={(v:string)=>{}}></MyComponent>
}
