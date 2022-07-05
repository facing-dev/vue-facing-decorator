import { TSX, Prop, Component, Vue } from 'vue-facing-decorator'

interface Props {
    propString: string
}

@Component
export default class MyComponent extends TSX<Props>()(Vue) {
    @Prop({
        required: true
    })
    propString!: string
}

//TypeScript会在TSX中检查组件的属性
function render() {
    return <MyComponent propString='foobar'></MyComponent>
}
