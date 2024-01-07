<template>
  <div class=" text-black">
    <SaaSRenderer />
  </div>
</template>

<script setup lang="ts">
import { onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onServerPrefetch, onUnmounted, onUpdated } from 'vue';
import SaaSRenderer from '@/components/SaaS/RendererPannel.vue';

</script>

