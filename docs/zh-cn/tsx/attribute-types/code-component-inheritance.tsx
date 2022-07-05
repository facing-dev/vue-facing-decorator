import { TSX, Prop, Component, ComponentBase, Vue } from 'vue-facing-decorator'

interface BaseProps {
    propNumber: number
}

@ComponentBase
class MyBaseComponent extends TSX<BaseProps>()(Vue) implements BaseProps {
    @Prop({
        required: true
    })
    propNumber!: number
}

interface Props {
    propString: string
}

@Component
export default class MyComponent extends TSX<Props>()(MyBaseComponent) implements Props {
    @Prop({
        required: true
    })
    propString!: string
}

function render() {
    return <MyComponent propString='foobar' propNumber={1}></MyComponent>
}
