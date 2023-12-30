<template>
  <div
    class="container"
    @mouseenter="instance.toggleHovering"
    @mouseleave="instance.toggleHovering"
  >
    <slot :instance="instance"></slot>
  </div>
</template>
<script lang="ts" setup>
/**
 * 注册动态组件模板， RootContainerProps
 * 
 */

import { SComponentProps } from '@/core/components';
import { CSSProperties, watch } from 'vue';
// 父组件传过来的组件值
const { instance, classData, props, styleData } = defineProps<SComponentProps & {
  classData?: object,
  props?: object,
  styleData?: CSSProperties
}>()
// 父组件传过来的组件值, 自定义初始值

if (classData) {
  watch(classData, () => {
    instance.updateAttr({ class: Object.values(classData), initData: classData })
  })
}
if (props) {
  watch(props, () => {
    instance.updateAttr({ initData: props })
  })
}
if (styleData) {
  watch(styleData, () => {
    instance.updateAttr({ style: styleData })
  })
}


// const attrs = useAttrs()


</script>

<style lang="scss" scoped>
.root-container {
  min-width: 100%;
  text-align: center;
  height: 100%;
  position: relative;

}
</style>