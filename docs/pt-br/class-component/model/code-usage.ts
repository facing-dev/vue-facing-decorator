import { Model, Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    props:{
        modelValue:{}
    },
    computed:{
        valueAgent:{
            get(){
                return this['modelValue']
            },
            set(value){
                this.$emit('update:modelValue',value)
            }
        }
    }
}
*/

/*
Em outros componentes:
<MyComponent v-model="foo"></MyComponent>
*/

@Component
export default class MyComponent extends Vue {
    @Model
    valueAgent!: string
}
