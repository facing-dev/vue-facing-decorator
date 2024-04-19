import { TSX, Prop, Component, Vue, toNative } from 'vue-facing-decorator'

interface Props {
    propString: string
}

@Component
export default class MyComponent extends TSX<Props>()(Vue) implements Props {
    @Prop({
        required: true
    })
    propString!: string
}

const Comp = toNative(MyComponent)

function render() {
    return <Comp propString='foobar'></Comp>
}
