import { VModel, Component, Vue } from 'vue-facing-decorator'

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
export default class MyComponent extends Vue {
    @VModel({
        name: 'value'
    })
    valueAgent!: string
}
