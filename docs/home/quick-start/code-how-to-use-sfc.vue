<template>
  <div></div>
</template>
<script lang="ts">
// DO NOT USE <script setup>

//vue option component.
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