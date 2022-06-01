# Read me

This repo is not released yet. Welcome to suggest and contribute. Message me on github.

# Example

```typescript
import { Component ,Base} from "ThisRepo";
@Component
export default class MyComponent extends Base{
  prop = "p";//a property
  meth() {//a method
    this.$forceUpdate()//call vue api
  }
  mounted(){//vue lifecycle hook
    console.log('foo')
  }
}
```

is equal to 

```typescript
import { defineComponent} from "vue";
export default defineComponent({
    data(){
        return {
            prop:'p'
        }
    },
    methods:{
        meth(){
            this.$forceUpdate()
        }
    },
    mounted() {
        console.log('foo')
    }
})
```