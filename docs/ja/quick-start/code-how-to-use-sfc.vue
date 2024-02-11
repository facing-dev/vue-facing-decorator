<template>
  <div></div>
</template>
<script lang="ts">
// DO NOT USE <script setup>

//vue options API.
/*
import { defineComponent } from "vue";
export default defineComponent({});
*/

//class component
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component
class MyComponent extends Vue {}
export default toNative(MyComponent)
</script>
<style>
</style>