<template>
  <div class="empty-box">
    <img
      :src="initData?.url || VueSvg"
      alt=""
      srcset=""
    >
  </div>
</template>
<script lang="ts" setup>
import VueSvg from '@/assets/vue.svg'
import { ImageComponentProps } from './ImageProps.vue';
// 定义需要编辑的组件属性
defineProps<{
  initData: ImageComponentProps
}>()
/**
 * 该组件将会展示如何设置自定义组件的初始属性及内容
 * 以及如何配置独有的属性编辑面板在右侧样式面板
 * 然后进行简单的交互
 * 原理其实和系统RootContainer还有ChildContainer一样
 */

</script>

<style lang="scss" scoped>
.empty-box {
  min-width: 100%;
  text-align: center;
  padding: 8px 8px;
  text-align: center;
  background-color: white;

  .text {
    font-size: 12px;
  }
}
</style>