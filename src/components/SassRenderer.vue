<template>
  <div>
    <RenderMain :data="props.data" class=" w-2xl m-auto" />
  </div>
</template>
<script setup lang="ts">
import { RendererProps } from '@/core/types/ComponentNode';
import RenderMain from './Renderer/Main.vue'
const props = defineProps<RendererProps>()

</script>