<template>
  <div class="">
    <div>属性 Props</div>
    {{ instance.vueComponent?.componentName }}
    <template v-if="instance.vueComponent?.propsComponent">
      <component
        :key="instance.uid"
        :instance="instance"
        :is="instance.vueComponent.propsComponent"
      ></component>
    </template>
    <template>
      <div>
        该组件无属性配置面板
      </div>
    </template>

  </div>
</template>
<script setup lang="ts">
/**
 * 该组件是配置选中组件的实例
 * 将会加载选中
 */
import { SComponentProps } from "@/core/components";
const { instance } = defineProps<SComponentProps>()
// 找到注册的组件实例，获取 propsComponent 组件
// const replaceTo = (name: string) => {
//   saasApp.action.replaceTo(name)
// }
</script>
