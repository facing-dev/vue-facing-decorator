import { Component, TSX, Prop, Base } from '../../dist'
interface Props {
    p: string
}
interface Events{
    e:Function
}
@Component
class TsxAttributeTypes extends TSX<Props,Events>()(Base) implements Props {
    @Prop({
        required: true
    })
    p!: string
}

export default {}