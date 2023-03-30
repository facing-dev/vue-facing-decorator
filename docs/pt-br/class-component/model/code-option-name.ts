import { Model, Component, Vue } from 'vue-facing-decorator'

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
Em outros componentes:
<MyComponent v-model:value="foo"></MyComponent>
*/

@Component
export default class MyComponent extends Vue {
    @Model({
        name: 'value'
    })
    valueAgent!: string
}
