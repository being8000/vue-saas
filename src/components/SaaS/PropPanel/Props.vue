<template>
  <div class="">
    <div class="text-3.5 font-bold text-[#333]">属性 Props</div>
    <template v-if="instance.parent && instance.parent.vueComponent?.propsComponent">
      <div style="border:1px solid #">
        <span class="text-3.5 font-bold"> 父节点属性： {{ instance.parent.vueComponent?.componentName }}</span>
        <component
          :key="instance.parent.uid"
          :instance="instance.parent"
          :is="instance.parent.vueComponent.propsComponent"
        ></component>
      </div>
    </template>
    <template v-if="instance.vueComponent?.propsComponent">
      <div>
        <span class="text-3.5 font-bold"> 当前节点： {{ instance.vueComponent?.componentName }}</span>
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
const { instance } = defineProps<SComponentProps>()


// 找到注册的组件实例，获取 propsComponent 组件
// const replaceTo = (name: string) => {
//   saasApp.action.replaceTo(name)
// }
</script>
