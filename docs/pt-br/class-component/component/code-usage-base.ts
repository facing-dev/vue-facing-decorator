import { Component, Vue } from 'vue-facing-decorator'
@Component
class MyComponent extends Vue {

}

//ou

@Component({
    //Coloque as opções desejadas aqui.
})
export default class MyComponentWithOptions extends Vue {

}