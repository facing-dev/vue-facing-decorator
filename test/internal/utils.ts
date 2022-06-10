
import { expect } from 'chai';
import 'mocha';
import { Base } from '../../dist'
import * as Utils from '../../dist/utils'


class Comp1Sup extends Base {
    method1Sup() {
        return 'method1Sup value'
    }
}


class Comp1 extends Comp1Sup {
    method1Comp() {
        return 'method1Comp value'
    }
}

class Comp2Sup extends Comp1 {
    method2Sup() {
        return 'method2Sup value'
    }
}


class Comp2 extends Comp2Sup {
    method2Comp() {
        return 'method2Comp value'
    }
}

class Comp3Sup extends Comp2 {
    method3Sup() {
        return 'method3Sup value'
    }
}

class Comp3 extends Comp3Sup {
    method3Comp() {
        return 'method3Comp value'
    }
}

describe('internal utils',
    () => {
        it('slot', () => {
            expect(true).to.equal(Utils.obtainSlot(Comp3.prototype).names instanceof Map)
        })
        it('toComponentReverse', () => {
            Utils.obtainSlot(Comp2.prototype)
            Utils.obtainSlot(Comp1.prototype)

            const path3 = Utils.toComponentReverse(Comp3.prototype)

            expect(2).to.equal(path3.length)

            expect(Comp3Sup).to.equal(path3[0].constructor)
            expect(true).to.equal(path3[0] instanceof Comp2)

            expect(Comp3).to.equal(path3[1].constructor)
            expect(true).to.equal(path3[1] instanceof Comp3Sup)

            const path2 = Utils.toComponentReverse(Comp2.prototype)
            expect(2).to.equal(path2.length)

            expect(Comp2Sup).to.equal(path2[0].constructor)
            expect(true).to.equal(path2[0] instanceof Comp1)

            expect(Comp2).to.equal(path2[1].constructor)
            expect(true).to.equal(path2[1] instanceof Comp2Sup)

            const path1 = Utils.toComponentReverse(Comp1.prototype)
            expect(2).to.equal(path1.length)

            expect(Comp1Sup).to.equal(path1[0].constructor)
            expect(true).to.equal(path1[0] instanceof Base)

            expect(Comp1).to.equal(path1[1].constructor)
            expect(true).to.equal(path1[1] instanceof Comp1Sup)
        })
    }
)
export default {}