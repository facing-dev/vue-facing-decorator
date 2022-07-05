import { Component, Vue } from 'vue-facing-decorator'
@Component
export default class MyComponent extends Vue {

    //这是一个vue响应式属性
    text = 'Example code'

    //这是一个vue组件方法
    method() {
        console.log(this.text)
    }

    //这是一个vue生命周期钩子
    mounted() {
        this.method()
    }
}