# Read me

Designed for vue 3.

Welcome to suggest and contribute. Message me on github.

Do the same work like [vue-class-component](https://github.com/vuejs/vue-class-component) and [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) in vue 3.

# Install

`npm install -S vue-facing-decorator`

# Finished

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
//super class, DO NOT SUPPORT ANY DECORATOR now
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