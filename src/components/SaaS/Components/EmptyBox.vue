<template>
  <div class="empty-box">
    <IconSquare style="color:rgb(2, 28, 34);width:50px" />
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ComponentType, SComponentProps } from '@/core/components';
import { computed } from 'vue';
import IconSquare from '../icons/add-square.vue'
const props = defineProps<SComponentProps>()

const text = computed(() => {
  return ({
    [ComponentType.Root.toString()]: "添加根容器",
    [ComponentType.RootContainer.toString()]: "添加子容器或组件",
    [ComponentType.ChildContainer.toString()]: "添加自定义组件",
  })[props.instance?.type]
})
</script>

<style lang="scss" scoped>
.empty-box {
  width: 100%;
  min-width: 100%;

  text-align: center;
  padding: 8px 8px;
  text-align: center;
  height: max-content;

  .text {
    font-size: 12px;
  }
}
</style>