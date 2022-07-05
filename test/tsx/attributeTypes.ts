import { Component, TSX, Prop, Base } from '../../dist'
interface Props {
    p: string
}
@Component
class TsxAttributeTypes extends TSX<Props>()(Base) implements Props {
    @Prop({
        required: true
    })
    p!: string
}

export default {}