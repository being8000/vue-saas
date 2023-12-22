<template>
  <div
    class="root-container"
    :class="Object.values(props.instance.attrs?.initData || {})"
  >
    <div class="tag">{{ props.instance.tag }} {{ props.instance.index }} - {{ props.instance.pid }}- {{ props.instance.uid
    }}</div>
    <slot>
      <EmptyBox :instance="instance" />
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