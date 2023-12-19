<template>
  <div class="root-container">
    <div class="tag">{{ props.instance.tag }} {{ props.instance.index }} - {{ props.instance.uid }}</div>
    <slot>
      <EmptyBox :tag="props.instance.tag" />
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { SComponentProps } from '@/core/components';
import EmptyBox from './EmptyBox.vue'
const props = defineProps<SComponentProps>()
</script>

<style lang="scss" scoped>
.root-container {
  min-width: 100%;
  text-align: center;


}
</style>