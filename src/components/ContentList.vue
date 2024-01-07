<template>
  <section class="main-container">
    <Contenteditable v-for="item in contentList" />
  </section>
</template>

<script setup>
import Contenteditable from './Contenteditable.vue';
import { shallowRef } from 'vue';
const contentList = shallowRef([{}])
const focus = () => {
  console.log('focus')
}
</script>