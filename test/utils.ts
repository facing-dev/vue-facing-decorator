export function isEmptyObject(arg: any) {
    if (typeof arg === 'undefined') {
        return true
    }
    if (arg === null) {
        return true
    }
    if (typeof arg === 'object') {
        if (Array.isArray(arg)) {
            return arg.length === 0
        } else {
            return Object.keys(arg).length === 0
        }
    }
}