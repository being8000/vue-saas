<template>
  <div class="empty-box ">
    <i class="i-mdi-archive-plus-outline"></i>
  </div>
</template>
<script lang="ts" setup>
// import { ComponentType, SComponentProps } from '@/core/components';
// import { computed } from 'vue';
// const props = defineProps<SComponentProps>()

// const text = computed(() => {
//   return ({
//     [ComponentType.Root.toString()]: "添加根容器",
//     [ComponentType.RootContainer.toString()]: "添加子容器或组件",
//     [ComponentType.ChildContainer.toString()]: "添加自定义组件",
//   })[props.instance?.type]
// })
</script>

<style lang="scss" scoped>
.empty-box {
  width: 100%;
  min-width: 100%;

  text-align: center;
  text-align: center;
  height: max-content;
  color: rgb(30, 8, 90);



  .text {
    font-size: 10px;
  }
}

.selected>.empty-box {
  color: var(--primary-color);
}
</style>