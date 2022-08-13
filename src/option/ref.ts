import { Cons, OptionBuilder } from '../component'
import { obtainSlot, optoinNullableMemberDecorator } from '../utils'

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: {}) {
    const slot = obtainSlot(proto)
    let map = slot.obtainMap<Map<string, any>>('ref')
    map.set(name, true)
})


export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap<Map<string, any>>('ref')!
    if (names) {
        optionBuilder.beforeCreateCallbacks??=[]
        optionBuilder.beforeCreateCallbacks.push(function(this:any){

            names.forEach((value, name) => {

                Object.defineProperty(this,name,{
                    get(this:any){
                        return this.$refs[name]
                    }
                })
            
            })
        })

    }
}