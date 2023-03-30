import { Component, Vue } from 'vue-facing-decorator'
@Component
export default class MyComponent extends Vue {

    //Assim fica uma propriedade reativa. 
    text = 'Example code'

    //Assim fica um metodo do componente.
    method() {
        console.log(this.text)
    }

    //Os hooks no ciclo de vida de um componente vue ficam assim.
    mounted() {
        this.method()
    }
}