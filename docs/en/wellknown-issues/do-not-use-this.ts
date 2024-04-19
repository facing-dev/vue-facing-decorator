import { Component, Vue, Prop } from 'vue-facing-decorator'
@Component
class Comp extends Vue {
    @Prop
    prop!: number

    method() { return '' }

    field1 = this.prop //NOT SUPPORT
    field2 = this.method()//NOT SUPPORT
}