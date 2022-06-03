# Read me

This repo is not released yet. Welcome to suggest and contribute. Message me on github.

# Finished

```typescript
import { Component, Ref, Base } from "ThisRepo";

//super class
class Sup extends Base {
  //reactivity super property
  supProp = "supProp";
  //super method
  supMethod() {}
  //super getter
  get supGetter() {
    return "supFoo";
  }
}

//component class
@Component
export default class Comp extends Sup {
  //create a ref
  @Ref
  ref!: HTMLDivElement;
  //reactivity property
  prop = "prop";
  //getter
  get getter() {
    return "foo";
  }
  //method
  method() {
    //call vue api
    this.$forceUpdate();
  }
  mounted() {
    //vue lifecycle
    console.log(this.ref,  this.prop, this.supProp,this.getter, this.supGetter);
  }
}
```

is equal to 

```typescript
import { defineComponent} from "vue";
export default defineComponent({
  data() {
    return {
      supProp: "supProp",
      prop: "prop",
    };
  },
  methods: {
    supMethod() {},
    method() {
      this.$forceUpdate();
    },
  },
  computed: {
    supGetter() {
      return "supGetter";
    },
    getter() {
      return "getter";
    },
    ref() {
      this.$refs["ref"];
    },
  },
  mounted() {
    console.log(this.ref, this.prop, this.supProp, this.getter, this.supGetter);
  },
});
```