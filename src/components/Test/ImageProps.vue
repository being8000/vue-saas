<template>
  <div class="container">
    <PropsField
      v-bind="image"
      :key="image.key"
      v-model="form.url"
      inline
    />
  </div>
</template>
<script lang="ts" setup>
/**
 * 注册动态组件模板， RootContainerProps
 * 
 */
//  新增margin. padding, background, flex
//  新增子容器的
import PropsField from '@/components/SaaS/System/PropsField.vue'
import { SComponentProps } from '@/core/components';
import { reactive, watch } from 'vue';
import { PropsFieldType } from '@/core/props-type';
export interface ImageComponentProps {
  url?: string // 图片URL地址
}
// 父组件传过来的组件值
const { instance } = defineProps<SComponentProps>()
// const display = ['flex', 'grid']
// 此处一一列出来是因为Unocss的on-demand 按需加载css。 
const image: PropsFieldType = {
  label: "上传",
  key: "image",
  type: "image",
  config: {

  },
};
// 父组件传过来的组件值, 自定义初始值
const form = reactive<ImageComponentProps>({
  url: undefined,
})

/**
 * 设置监听对象取更新主App中对应组件的属性
 */
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