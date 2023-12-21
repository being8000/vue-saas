<template>
  <div class="">
    <div>属性 Props</div>
    <template v-if="parent && parent?.vueComponent?.propsComponent">
      <div>
        父节点属性： {{ parent.vueComponent?.componentName }}
        <component
          :key="parent.uid"
          :instance="parent"
          :is="parent.vueComponent.propsComponent"
        ></component>
      </div>
    </template>
    <template v-if="instance.vueComponent?.propsComponent">
      <div>
        当前节点： {{ instance.vueComponent?.componentName }}
        <component
          :key="instance.uid"
          :instance="instance"
          :is="instance.vueComponent.propsComponent"
        ></component>
      </div>
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
import { computed } from "vue";
const { instance } = defineProps<SComponentProps>()

const parent = computed(() => {
  return instance.parent
})
// 找到注册的组件实例，获取 propsComponent 组件
// const replaceTo = (name: string) => {
//   saasApp.action.replaceTo(name)
// }
</script>
