//Comp.ts
import { Component, Base, toNative } from 'vue-facing-decorator'
import render from './Comp.render'

@Component({
    render
})
class Comp extends Base {
    counter = 1

    onClick() {
        this.counter++
    }
}

toNative(Comp)