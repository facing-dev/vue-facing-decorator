import { BeforeUnmount, Mounted } from '../dist'

class MyTestComponent implements BeforeUnmount, Mounted {
  beforeUnmount(): void {}
  mounted(): void {}
}
