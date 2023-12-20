<template>
  <div class="root-container">
    <div class="tag">{{ instance.tag }} {{ instance.index }} - {{ instance.uid }}</div>
    <slot>
      <EmptyBox :tag="instance.tag" />
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { SComponentProps } from '@/core/components';
import EmptyBox from './EmptyBox.vue'
const { instance } = defineProps<SComponentProps>()
</script>

<style lang="scss" scoped>
.root-container {
  min-width: 100%;
  text-align: center;
  height: 100%;
  position: relative;

}
</style>