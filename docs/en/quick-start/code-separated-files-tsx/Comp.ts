//Comp.ts
import {
    Component,
    Base,
} from 'vue-facing-decorator'
import render from './Comp.render'

@Component({
    render
})
export default class Comp extends Base {
    counter = 1

    onClick() {
        this.counter++
    }
}