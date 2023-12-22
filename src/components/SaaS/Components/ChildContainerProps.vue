<template>
  <div class="container">
    <PropsField
      v-bind="starts"
      :key="starts.key"
      v-model="form.start"
      inline
    />
    <PropsField
      v-bind="ends"
      :key="ends.key"
      v-model="form.end"
      inline
    />
    <PropsField
      v-bind="spans"
      :key="spans.key"
      v-model="form.span"
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
import PropsField from '@/components/SaaS/System/PropsField.vue'
import { SComponentProps } from '@/core/components';
import { reactive, watch } from 'vue';
import { PropsFieldType } from '@/core/props-type';
interface Form {
  start?: string
  end?: string,
  span?: string
}
// 父组件传过来的组件值
const { instance } = defineProps<SComponentProps>()
// const display = ['flex', 'grid']
// 此处一一列出来是因为Unocss的on-demand 按需加载css。 
const starts: PropsFieldType = {
  label: "起始列",
  key: "start",
  type: "radio",
  config: [{
    label: "None",
    value: null,
  }, {
    label: "1",
    value: "col-start-1",
  },
  {
    label: "2",
    value: "col-start-2",
  }, {
    label: "3",
    value: "col-start-3",
  }, {
    label: "4",
    value: "col-start-4",
  }, {
    label: "5",
    value: "col-start-5",
  }, {
    label: "6",
    value: "col-start-6",
  }, {
    label: "7",
    value: "col-start-7",
  }, {
    label: "8",
    value: "col-start-8",
  }],
};
const ends: PropsFieldType = {
  label: "结束列",
  key: "ends",
  type: "radio",
  config: [{
    label: "None",
    value: null,
  }, {
    label: "1",
    value: "col-end-1",
  },
  {
    label: "2",
    value: "col-end-2",
  }, {
    label: "3",
    value: "col-end-3",
  }, {
    label: "4",
    value: "col-end-4",
  }, {
    label: "5",
    value: "col-end-5",
  }, {
    label: "6",
    value: "col-end-6",
  }, {
    label: "7",
    value: "col-end-7",
  }, {
    label: "8",
    value: "col-end-8",
  }
  ],
};

const spans: PropsFieldType = {
  label: "跨度",
  key: "spans",
  type: "radio",
  config: [
    {
      label: "None",
      value: null,
    },
    {
      label: "1",
      value: 'col-span-1',
    },
    {
      label: "2",
      value: "col-span-2",
    }, {
      label: "3",
      value: "col-span-3",
    }, {
      label: "4",
      value: "col-span-4",
    }, {
      label: "5",
      value: "col-span-5",
    }, {
      label: "6",
      value: "col-span-6",
    }, {
      label: "7",
      value: "col-span-7",
    }, {
      label: "8",
      value: "col-span-8",
    }
  ],
};
// 父组件传过来的组件值, 自定义初始值
const form = reactive<Form>({
  start: undefined,
  end: undefined,
  span: undefined,
  ...instance.attrs?.initData
})
watch(form, () => {
  instance.updateAttr({ class: Object.values(form), initData: form })
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