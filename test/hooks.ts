import { HookBeforeUnmount, HookMounted } from '../dist/esm'

class MyTestComponent implements HookBeforeUnmount, HookMounted {
  beforeUnmount(): void {}
  mounted(): void {}
}
