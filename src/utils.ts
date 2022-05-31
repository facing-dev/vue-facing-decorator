const SlotSymbol = Symbol('vue-facing-decorator-slot')
class Slot {
    
}

export function makeSlot(obj: any): Slot {
    if (obj[SlotSymbol]) {
        throw ''
    }
    return obj[SlotSymbol] = new Slot
}
export function getSlot(obj: any): Slot | undefined {
    return obj[SlotSymbol]
}

export function obtainSlot(obj: any): Slot {
    const slot = getSlot(obj)
    if (slot) {
        return slot
    }
    return makeSlot(obj)


}