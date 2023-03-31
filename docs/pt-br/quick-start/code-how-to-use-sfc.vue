<template>
  <div></div>
</template>
<script lang="ts">
// NÃO USE <script setup>

//vue options API.
/*
import { defineComponent } from "vue";
export default defineComponent({});
*/

//Componente com class
import { Component, Vue } from "vue-facing-decorator";
@Component
export default class MyComponent extends Vue {}
</script>
<style>
</style>