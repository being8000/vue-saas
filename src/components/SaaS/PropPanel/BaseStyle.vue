<template>
  <div class="container">
    <div class="text-3.5 font-bold text-[#000] mb-3">基础样式</div>
    <div class="text-3 font-bold text-[#333]">间距（Padding）</div>
    <section class="grid grid-cols-2">
      <!-- <div class="text-3 font-bold py-2">内间距</div> -->
      <PropsField
        v-bind="{
          ...padding,
          label: '左间距',
        }"
        v-model="style.paddingLeft"
        inline
      />
      <PropsField
        v-bind="{
          ...padding,
          label: '右间距',
        }"
        v-model="style.paddingRight"
        inline
      />
      <PropsField
        v-bind="{
          ...padding,
          label: '上间距',
        }"
        v-model="style.paddingTop"
        inline
      />
      <PropsField
        v-bind="{
          ...padding,
          label: '下间距',
        }"
        v-model="style.paddingBottom"
        inline
      />
    </section>
    <div class="text-3 font-bold text-[#333]">边距（Margin）</div>
    <section class="grid grid-cols-2">
      <PropsField
        v-bind="{
          ...margin,
          label: `左边距`,
          key: `marginBottom`
        }"
        :key="margin.key"
        v-model="style.marginLeft"
        inline
      />
      <PropsField
        v-bind="{
          ...margin,
          label: `右边距`,
          key: `marginBottom`
        }"
        :key="margin.key"
        v-model="style.marginRight"
        inline
      />
      <PropsField
        v-bind="{
          ...margin,
          label: `上边距`,
          key: `marginBottom`
        }"
        :key="margin.key"
        v-model="style.marginTop"
        inline
      />
      <PropsField
        v-bind="{
          ...margin,
          label: `下边距`,
          key: `marginBottom`
        }"
        :key="margin.key"
        v-model="style.marginBottom"
        inline
      />
    </section>
    <PropsField
      v-bind="{
        label: `背景色`,
        key: `color`,
        type: `color`,
      }"
      :key="margin.key"
      v-model="style.backgroundColor"
      inline
    />
  </div>
</template>
<script lang="ts" setup>
/**
 * 注册动态组件模板， RootContainerProps
 * 
 */
// TODO 新增margin. padding, background, flex
// TODO 新增子容器的
import PropsField from '@/components/SaaS/System/PropsField.vue';
import { saasApp } from '@/core';
import { PropsFieldType } from '@/core/props-type';
import { SComponentProps } from "@/core/components";
const { instance } = defineProps<SComponentProps>()
import { CSSProperties, ref, toRaw, watch } from 'vue';
// 父组件传过来的组件值


type Style = Pick<CSSProperties, "backgroundColor" | "paddingLeft" | "paddingRight" | "paddingBottom" | "paddingTop" | "marginLeft" | "marginRight" | "marginBottom" | "marginTop">
const style = ref<Style>(instance.attrs?.style || {})
// const transformToPx = (): CSSProperties => {
//   const st = JSON.parse(JSON.stringify(style))
//   Object.keys(st).forEach(el => {
//     if (["margin", "padding"].includes(el)) {
//       st[el] = st[el] + 'px'
//     }
//     if (["backgroundColor"].includes(el)) {
//       st[el] = "#" + st[el]
//     }
//   })
//   console.log(st)
//   return st
// }
const config = {
  min: -5,
  max: 5,
  unit: 'px',
  width: '50px'
}
const padding: PropsFieldType = {
  label: "内间距",
  key: "display",
  type: "number",
  config,
};
const margin: PropsFieldType = {
  label: "上边距",
  key: "display",
  type: "number",
  config,
};

watch(style.value, () => {
  saasApp.activedComponent?.updateAttr({ style: toRaw(style).value })
})
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