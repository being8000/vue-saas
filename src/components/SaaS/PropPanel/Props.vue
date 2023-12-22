<template>
  <div>
    <Props
      v-if="instance.parent"
      :instance="instance.parent"
      :key="instance.parent.uid"
    />
    <template v-if="instance.vueComponent?.propsComponent">
      <div class="b-1 b-amber bg-[#f5f5f5] p-2 rounded mt-5">
        <span class="text-3.5 font-bold text-[#000]"> {{ instance.vueComponent?.componentName }}</span>
        <component
          :key="instance.uid"
          :instance="instance"
          :is="instance.vueComponent.propsComponent"
        ></component>
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
