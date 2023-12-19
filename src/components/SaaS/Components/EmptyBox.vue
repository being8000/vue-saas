<template>
  <div class="empty-box">
    <IconSquare style="color:rgb(2, 28, 34);width:50px" />
    <div class="text">请点击添加子组件</div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  tag: string | undefined
}>()
import IconSquare from '../icons/add-square.vue'
</script>

<style lang="scss" scoped>
.empty-box {
  width: 100%;
  min-width: 100%;

  text-align: center;
  padding: 8px 8px;
  text-align: center;
  background-color: white;
  height: max-content;

  .text {
    font-size: 12px;
  }
}
</style>