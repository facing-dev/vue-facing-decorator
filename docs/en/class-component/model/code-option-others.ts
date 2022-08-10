import { Model, Component, Vue } from 'vue-facing-decorator'

/*
Vue options API
{
    props:{
        modelValue:{
            type:String,
            default:'bar',
            //...
        }
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
In other components:
<MyComponent v-model="foo"></MyComponent>
*/

@Component
export default class MyComponent extends Vue {
    @Model({
        type: String,
        default: 'bar',
        //...
    })
    valueAgent!: string
}
