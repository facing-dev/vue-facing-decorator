import { TSX, Prop, Component, Vue } from 'vue-facing-decorator'

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

function render() {
    return <MyComponent propString='foobar'></MyComponent>
}
