import { Model, Component, Vue, toNative } from 'vue-facing-decorator'

/*
Vue options API
{
    props:{
        value:{}
    },
    computed:{
        valueAgent:{
            get(){
                return this['value']
            },
            set(value){
                this.$emit('update:value',value)
            }
        }
    }
}
*/

/*
In other components:
<MyComponent v-model:value="foo"></MyComponent>
*/

@Component
class MyComponent extends Vue {
    @Model({
        name: 'value'
    })
    valueAgent!: string
}

export default toNative(MyComponent)