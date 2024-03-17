import { Component, TSX, Base, mixins } from '../../dist/esm'

@Component
class A extends TSX<{
    pA: number
}, {
    eA: () => void
}>()(Base) {

}

@Component
class B extends TSX<{
    pB: number
}, {
    eB: () => void
}>()(A) {

}

@Component
class C extends TSX<{
    pC: number
}, {
    eC: () => void
}>()(Base) {

}

@Component
class D extends TSX<{
    pD:number
}, {
    eD: () => void
}>()(mixins(B, C)) {
    checkType() {
        this.pA
        this.onEA
        this.pB
        this.onEB
        this.pC
        this.onEC
        this.pD
        this.onED

    }
}

export default {}


// const template = <D q-a={1} kk={1}></D>