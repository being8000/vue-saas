<template>
  <img
    :src="initData?.url"
    alt=""
    srcset=""
    v-if="initData?.url"
  >
  <div
    v-else
    class="empty-image flex flex-col p-3 text-#5c5b5e "
  >
    <svg
      width="50px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19 13a1 1 0 0 0-1 1v.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.7l-2.48-2.48a2.85 2.85 0 0 0-3.93 0L4 12.6V7a1 1 0 0 1 1-1h7a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1M5 20a1 1 0 0 1-1-1v-3.57l2.9-2.9a.79.79 0 0 1 1.09 0l3.17 3.17l4.3 4.3Zm13-1a.89.89 0 0 1-.18.53L13.31 15l.7-.7a.77.77 0 0 1 1.1 0L18 17.21Zm4.71-14.71l-3-3a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-3 3a1 1 0 0 0 1.42 1.42L18 4.41V10a1 1 0 0 0 2 0V4.41l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"
      />
    </svg>
  </div>
</template>
<script lang="ts" setup>
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
img {
  width: 100%;
}

.selected.empty-image {
  color: var(--primary-color);
}
</style>