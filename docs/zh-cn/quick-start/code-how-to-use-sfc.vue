<template>
  <div></div>
</template>
<script lang="ts">
// ！！！不要使用 <script setup>

//vue options API.
/*
import { defineComponent } from "vue";
export default defineComponent({});
*/

//class component
import { Component, Vue } from "vue-facing-decorator";
@Component
export default class MyComponent extends Vue {}
</script>
<style>
</style>