<template>
  <PropsEditor
    :instance="instance"
    :class-data="form"
  >
    <PropsField
      v-bind="display"
      :key="display.key"
      v-model="form.dispaly"
      inline
    />
    <PropsField
      v-bind="gridCols"
      :key="gridCols.key"
      v-model="form.cols"
      inline
    />
    <PropsField
      v-bind="gaps"
      :key="gaps.key"
      v-model="form.gap"
      inline
    />
  </PropsEditor>
</template>
<script lang="ts" setup>
/**
 * 注册动态组件模板， RootContainerProps
 * 
 */
// TODO 新增margin. padding, background, flex
// TODO 新增子容器的
import PropsEditor from '@/components/SaaS/System/PropsEditor.vue';
import PropsField from '@/components/SaaS/System/PropsField.vue';
import { SComponentProps } from '@/core/components';
import { PropsFieldType } from '@/core/props-type';
import { reactive } from 'vue';
interface Form {
  dispaly?: 'flex' | 'grid'
  cols?: string,
  gap?: string
}
// 父组件传过来的组件值
const { instance } = defineProps<SComponentProps>()
// const display = ['flex', 'grid']
// 此处一一列出来是因为Unocss的on-demand 按需加载css。 
const display: PropsFieldType = {
  label: "布局",
  key: "display",
  type: "radio",
  config: [
    // {
    //   label: "弹性",
    //   value: "flex",
    // }, 
    {
      label: "网格",
      value: "grid",
    },
  ],
};
const gridCols: PropsFieldType = {
  label: "列数",
  key: "display",
  type: "radio",
  config: [
    {
      label: "1",
      value: "grid-cols-1",
    }, {
      label: "2",
      value: "grid-cols-2",
    }, {
      label: "3",
      value: "grid-cols-3",
    }, {
      label: "4",
      value: "grid-cols-4",
    }, {
      label: "5",
      value: "grid-cols-5",
    }, {
      label: "6",
      value: "grid-cols-6",
    }, {
      label: "7",
      value: "grid-cols-7",
    }, {
      label: "8",
      value: "grid-cols-8",
    }, {
      label: "9",
      value: "grid-cols-9",
    },
  ],
}
const gaps: PropsFieldType = {
  label: "间隔",
  key: "gaps",
  type: "radio",
  config: [
    {
      label: "0",
      value: "gap-0",
    },
    {
      label: "1",
      value: "gap-1",
    }, {
      label: "2",
      value: "gap-2",
    }, {
      label: "3",
      value: "gap-3",
    }, {
      label: "4",
      value: "gap-4",
    }, {
      label: "5",
      value: "gap-5",
    }, {
      label: "6",
      value: "gap-6",
    }, {
      label: "7",
      value: "gap-7",
    }, {
      label: "8",
      value: "gap-8",
    }, {
      label: "9",
      value: "gap-9",
    },
  ],
}
// 父组件传过来的组件值, 自定义初始值
const form = reactive<Form>({
  cols: 'grid-cols-1',
  dispaly: 'grid',
  gap: 'gap-0',
  ...instance.attrs?.initData
})
// watch(form, () => {
//   instance.updateAttr({ class: Object.values(form), initData: form })
// })
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