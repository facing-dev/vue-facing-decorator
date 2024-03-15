import { Component, TSX, Prop, Base } from '../../dist/esm'
interface Props {
    p: string
}
interface Events {
    e: Function
    e2: string
}
@Component
class TsxAttributeTypes extends TSX<Props, Events>()(Base) implements Props {
    @Prop({
        required: true
    })
    p!: string
}

export default {}