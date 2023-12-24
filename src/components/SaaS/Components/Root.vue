<template>
  <div class="root-container">
    <div class="tag"> {{ instance.vueComponent?.componentName }}[{{ instance.uid
    }}]</div>
    <slot>
      <EmptyBox :instance="instance" />
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
  position: relative;

}
</style>