//Comp.render.tsx
import type Comp from './Comp'
import Style from './style.css'
export default function render(this: Comp) {
    return <div class={Style.root} onClick={this.onClick}>
        {this.counter}
    </div>
}