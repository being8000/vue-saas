<template>
  <div class="container">
    <div>基础样式</div>
    <section>
      <div class="text-3 font-bold">内间距</div>
      <div class=" b-1 b-amber bg-[#f5f5f5] p-2 rounded">
        <PropsField
          v-bind="padding"
          :key="padding.key"
          v-model="style.paddingTop"
          inline
        />
        <PropsField
          v-bind="{
            ...padding,
            label: `下间距`,
            key: `paddingBottom`
          }"
          :key="padding.key"
          v-model="style.paddingBottom"
          inline
        />
        <PropsField
          v-bind="{
            ...padding,
            label: `左间距`,
            key: `paddingLeft`
          }"
          :key="padding.key"
          v-model="style.paddingLeft"
          inline
        />
        <PropsField
          v-bind="{
            ...padding,
            label: `右间距`,
            key: `paddingRight`
          }"
          :key="padding.key"
          v-model="style.paddingRight"
          inline
        />
      </div>
    </section>
    <section>
      <div class="text-3 font-bold">外边距</div>
      <div class=" b-1 b-amber bg-[#f5f5f5] p-2 rounded">
        <PropsField
          v-bind="margin"
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
        <PropsField
          v-bind="{
            ...margin,
            label: `左边距`,
            key: `marginLeft`
          }"
          :key="margin.key"
          v-model="style.marginLeft"
          inline
        />
        <PropsField
          v-bind="{
            ...margin,
            label: `右边距`,
            key: `marginRight`
          }"
          :key="margin.key"
          v-model="style.marginRight"
          inline
        />
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
/**
 * 注册动态组件模板， RootContainerProps
 * 
 */
// TODO 新增margin. padding, background, flex
// TODO 新增子容器的
import PropsField from '@/components/SaaS/System/PropsField.vue'
import { SComponentProps } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import { AppEventParameters } from '@/core/event-types';
import { PropsFieldType } from '@/core/props-type';
import { CSSProperties, reactive, watch } from 'vue';
// 父组件传过来的组件值
const { instance } = defineProps<SComponentProps>()


type Style = Pick<CSSProperties, "marginTop" | "marginBottom" | "marginRight" | "paddingLeft" | "paddingRight" | "paddingBottom" | "paddingTop" | "marginLeft">
const style = reactive<Style>({
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: 0,
})
const transformToPx = (): CSSProperties => {
  const st = JSON.parse(JSON.stringify(style))
  Object.keys(st).forEach(el => {
    st[el] = st[el] + 'rem'
  })
  return st
}
const config = {
  min: -5,
  max: 5,
  step: 0.01,
  unit: 'rem'
}
const padding: PropsFieldType = {
  label: "上间距",
  key: "display",
  type: "slider",
  config,
};
const margin: PropsFieldType = {
  label: "上边距",
  key: "display",
  type: "slider",
  config,
};
let inst = instance
const appSelect = (params: AppEventParameters) => {
  inst = params.component
  if (inst.attrs) {
    // const st = (inst.attrs.style || {}) as Style
    // Object.keys(st).forEach(el => {
    //   style[el] = parseInt(st[el]) as any
    // })
  }
}
const appCancelSelect = (params: AppEventParameters) => {
  inst = params.component
}
appEvents.subscribe("appSelect", appSelect)
appEvents.subscribe("appCancelSelect", appCancelSelect)
watch(style, () => {
  inst.updateAttr({ style: transformToPx() })
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