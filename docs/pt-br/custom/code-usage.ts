import { createDecorator, Component, Vue } from 'vue-facing-decorator'

function Log(prefix: string) {
    return createDecorator(function (options, key) {
        const old = options.methods?.[key]
        if (!old) {
            throw 'not found'
        }
        options.methods[key] = function (...args: any[]) {
            old.apply(this, args)
        }
    })
}

@Component
export default class Comp extends Vue {
    @Log('prefix')
    method() {

    }
}