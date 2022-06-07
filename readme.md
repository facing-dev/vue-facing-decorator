# Read me

Designed for vue 3, do the same work like [vue-class-component](https://github.com/vuejs/vue-class-component) and [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator).

* Community desired vue class component with typescript decorators.
* Safety. Transform es class to vue option api according to specifications.
* Performance. Once transform on project loading, ready for everywhere.
* Support both es class inherit and vue component extending.


Welcome to suggest and contribute. Message me on github.

# Install

`npm install -S vue-facing-decorator`



# How to use

### Index

* [Basic](#basic)
* [Extends](#extends)
* [Tsx render](#tsx-render)

### Basic

```typescript
import {
  Component,
  Ref,
  Watch,
  Prop,
  Inject,
  Emit,
  Base,
} from "vue-facing-decorator";
import AnotherComponent from "./AnotherComponent.vue";
//super class. See extends section.
class Sup extends Base {
  //reactivity super property
  supProperty = "supProperty";
  //super method
  supMethod() {}
  //super getter
  get supGetter() {
    return "supGetter";
  }
}

//component class
@Component({
  //OPTION, component name
  name: "MyComponent",
  //OPTION, emits
  emits: ["update:modelValue"],
  //OPTION, provide object or function(this:Comp){return {foo:'bar'}}
  provide: {
    provideKey: "provideValue",
  },
  //OPTION, components
  components: {
    AnotherComponent,
  },
  //OPTION, inheritAttrs
  inheritAttrs:true,
  //OPTION, expose
  expose:[],
  //OPTION, directives
  directives:{

  },
  //OPTION, use modifier to modify component option built by vue-facing-decorator
  modifier: (option: any) => {
    console.log("generated optoin", option);
    option.methods ??= {};
    option.methods.method2 = function () {
      console.log("method2");
    };
    return option;
  },
})
export default class Comp extends Sup {
  //emit an event with name of method
  @Emit()
  eventName(arg: any) {
    return arg;
  }
  //emit an event with custom name and promise value
  //event will be emitted when promise resolved
  @Emit("eventCustomNamePromise")
  event2(arg: any) {
    return new Promise((resolver) => {
      resolver(arg);
    });
  }
  //create a ref
  @Ref
  readonly ref!: HTMLDivElement;
  //create a prop
  @Prop({
    //prop options
    required: true,
    default: "default prop",
    type: String,
    validator(v: string) {
      console.log("prop validator", v);
      return true;
    },
  })
  readonly prop!: string;
  //v-model default prop
  @Prop({
    required: true,
    type: Number,
  })
  readonly modelValue!: number;

  //reactivity property
  property = "property";
  //getter
  get getter() {
    return "getter";
  }

  //method
  method() {
    //call vue api
    this.$forceUpdate();
    //set reactivity property
    this.property += ">";
    //trigger update v-model
    this.$emit("update:modelValue", this.modelValue + 1);
  }

  //create a watcher
  @Watch("property", {
    //watcher options
    deep: true,
    immediate: true,
    flush: "post",
  })
  propertyWatcher(newv: string, oldv: string) {
    console.log("property changed", newv, oldv);
  }
  //inject from acient components
  @Inject({
    //inject options
    default: "defult value",
    from: "provideAcientKey",
  })
  provideAcientKeyAlias!: string;

  mounted() {
    //vue lifecycle
    console.log(
      this.ref,
      this.getter,
      this.property,
      this.supProperty,
      this.supGetter,
      this.prop,
      this.provideAcientKeyAlias
    );
    this.eventName("eventName value");
    this.event2("eventCustomNamePromise value");
  }
}
```

is equal to 

```typescript
import { defineComponent} from "vue";
import AnotherComponent from "./AnotherComponent.vue";
export default defineComponent({
  name: "MyComponent",
  components: {
    AnotherComponent,
  },
  emits: ["update:modelValue", "eventName", "eventCustomNamePromise"],
  provide: {
    provideKey: "provideValue",
  },
  inject: {
    provideAcientKeyAlias: {
      default: "defult value",
      from: "provideAcientKey",
    },
  },
  data() {
    return {
      supProperty: "supProperty",
      property: "property",
    };
  },
  methods: {
    supMethod() {},
    method() {
      this.$forceUpdate();
      this.$emit("update:modelValue", this.modelValue + 1);
    },
    method2() {
      console.log("method2");
    },
    eventName() {
      this.$emit("eventName", "eventName value");
    },
    async event2() {
      const value = await new Promise<any>((resolver) => {
        resolver("eventCustomNamePromise value");
      });
      this.$emit("eventCustomNamePromise", value);
    },
  },
  watch: {
    property: function (newv: string, oldv: string) {
      console.log("property changed", newv, oldv);
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
  props: {
    prop: {
      required: true,
      default: "default prop",
      type: String,
      validator: function (v: string) {
        console.log("prop validator", v);
        return true;
      } as any, // type error
    },
    modelValue: { type: Number, required: true },
  },
  mounted() {
    console.log(
      this.ref,
      this.property,
      this.supProperty,
      this.getter,
      this.supGetter,
      this.prop,
      (this as any).provideAcientKeyAlias //type error
    );
  },
});
```

### Extends

```typescript
import { Component, ComponentBase, Base } from 'vue-facing-decorator'
//Comp1 super class
class Comp1Sup extends Base {
    method1Sup() {
        return 'method1Sup value'
    }
}
/*
Comp1 base component. To define a base component use `@ComponentBase` instead of `@Component`.
Runtime will bundle Class `Comp1` and `Comp1Sup` to a vue option component.
Methods of Comp1 will override `Comp1Sup`'s.
Decorators can be only used on `@Component` and `@ComponentBase` classes. Comp1Sup don't accept any decorators.
*/
@ComponentBase
class Comp1 extends Comp1Sup {
    method1Comp() {
        return 'method1Comp value'
    }
}

class Comp2Sup extends Comp1 {
    method2Sup() {
        return 'method2Sup value'
    }
}


/*
Similer to Comp1, runtime will bundle class `Comp2` and `Comp2Sup` into a vue option component.
Bundled `Comp2` will extends bundled `Comp1` by vue `extends` option `{extends:Comp1}`
*/
@ComponentBase
class Comp2 extends Comp2Sup {
    method2Comp() {
        return 'method2Comp value'
    }
}

class Comp3Sup extends Comp2 {
    method3Sup() {
        return 'method3Sup value'
    }
}

/*

(Comp3 -> Comp3Sup) vue extends (Comp2 -> Comp2Sup) vue extends (Comp1 -> Comp1Sup)

Class extends class by ES class extending strategy i.e. `Comp3 -> Comp3Sup` .

Vue component extends vue component by vue component exteding strategy i.e. `(Comp3 -> Comp3Sup) vue extends (Comp2 -> Comp2Sup)`

`Comp3` is a "Final Component" decorated by '@Component'.
*/
@Component
export default class Comp3 extends Comp3Sup {
    method3Comp() {
        return 'method3Comp value'
    }
}
```

is euqal to

```typescript
import { defineComponent } from 'vue';
export default defineComponent({
    extends: {
        extends: {
            methods: {
                method1Comp() {
                    return 'method1Comp value'
                }
            }
        },
        methods: {
          method2Comp() {
              return 'method2Comp value'
          }
        }
    },
    methods: {
        method3Comp() {
            return 'method3Comp value'
        }
    }
})

```

### Tsx render

```tsx
//in Comp.render.tsx
import type Comp from './Comp'

export default function render(this: Comp) {
    return <div onClick={this.onClick}>Tsx render {this.number}</div>
}

//in Comp.ts
import {
    Component,
    Base,
} from 'vue-facing-decorator'
import render from './Comp.render'

@Component({
    render
})
export default class Comp extends Base {
    number = 1
    onClick() {
        this.number++
    }
}

//in parent component
import {
  Component,
  Base,
} from 'vue-facing-decorator';
import Comp from "./Comp"

@Component({
  components:{
    Comp
  }
})
export default class ParentComponent extends Base {

}
```

is euqal to

```typescript
//in Comp.ts
import { defineComponent } from "vue";
import render from './Comp.render'
export default defineComponent({
    render,
    data(){
        return {
            number:1
        }
    },
    methods:{
        onClick(){
            this.number++
        }
    }
})
```