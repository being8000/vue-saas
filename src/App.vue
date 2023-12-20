<script setup lang="ts">
import { onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onServerPrefetch, onUnmounted, onUpdated } from 'vue';
// import SaaSRenderer from '@/components/SaaSRenderer.vue'
import './style.css'
import SaaSRenderer from '@/components/SaaS/RendererPannel.vue';



onMounted(() => {
  console.log('onMounted')
})
onUpdated(() => {
  console.log('onUpdated')
})
onUnmounted(() => {
  console.log('onUnmounted')
})
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
onErrorCaptured(() => {
  console.log('onErrorCaptured')
})
onRenderTracked(() => {
  console.log('onRenderTracked')
})
onRenderTriggered(() => {
  console.log('onRenderTriggered')
})
onActivated(() => {
  console.log('onActivated')
})
onDeactivated(() => {
  console.log('onDeactivated')
})
onServerPrefetch(() => {
  console.log('onServerPrefetch')
})
</script>

<template>
  <div class=" text-black">
    <SaaSRenderer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
