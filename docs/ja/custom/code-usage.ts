import { createDecorator, Component, Vue, toNative } from 'vue-facing-decorator'

function Log(prefix: string) {
    return createDecorator(function (options, key) {
        const old = options.methods?.[key]
        if (!old) {
            throw 'not found'
        }
        options.methods[key] = function (...args: any[]) {
            old.apply(this, args)
        }
    }, {
        preserve: true
    })
}

@Component
class Comp extends Vue {
    @Log('prefix')
    method() {

    }
}

export default toNative(Comp)