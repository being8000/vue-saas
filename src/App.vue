<script setup lang="ts">
import { ref, onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount, onErrorCaptured, onRenderTracked, onRenderTriggered, onActivated, onDeactivated, onServerPrefetch } from 'vue'
// import SassRenderer from '@/components/SassRenderer.vue'
import SassRenderer from '@/components/Sass/RendererPannel.vue'
import { ComponentType, PlainNode } from './sass/components';
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
const data = ref<PlainNode>({
  tag: 'div',
  type: ComponentType.Container,
  attrs: {
  },
  children: [
    {
      type: ComponentType.Container,
      tag: 'div',
      attrs: {
        class: 'flex'
      },
      children: [{
        type: ComponentType.Container,
        tag: 'div',
        attrs: {
          class: 'flex'
        },
        children: []
      }, {
        type: ComponentType.Container,
        tag: 'div',
        attrs: {
          class: 'flex'
        },
        children: []
      }]
    },
    {
      type: ComponentType.Container,
      tag: 'div',
      attrs: {
        class: 'flex'
      },
      children: []
    }
  ]
})
</script>

<template>
  <div class=" text-black">
    <SassRenderer :data="data" />
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
