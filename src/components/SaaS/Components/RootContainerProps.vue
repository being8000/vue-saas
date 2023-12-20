<template>
  <div class="container">
    <form class=" space-y-2">
      <div class="flex flex-wrap gap-3">
        <div>Display</div>
        <div>
          <div
            class="flex align-items-center"
            v-for="(item, index) in display"
          >
            <RadioButton
              v-model="form.dispaly"
              :inputId="`display${index}`"
              name="display"
              :value="item"
            />
            <label
              :for="`display${index}`"
              class="ml-2"
            >{{ item }}</label>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
        <div>Columns</div>
        <div>
          <div
            class="flex align-items-center"
            v-for="(item, index) in gridCols"
          >
            <RadioButton
              v-model="form.cols"
              :inputId="`cols${index}`"
              name="cols"
              :value="item"
            />
            <label
              :for="`cols${index}`"
              class="ml-2"
            >{{ item }}</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
/**
 * 注册动态组件模板， RootContainerProps
 */
import RadioButton from 'primevue/radiobutton';
import { SComponentProps } from '@/core/components';
import { reactive, watch } from 'vue';
interface Form {
  dispaly?: 'flex' | 'grid'
  cols?: string,
}
// 父组件传过来的组件值
const { instance } = defineProps<SComponentProps>()
const display = ['flex', 'grid']
// 此处一一列出来是因为Unocss的on-demand 按需加载css。 
const gridCols = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
  "grid-cols-8",
  "grid-cols-9",
  "grid-cols-10"
]
// 父组件传过来的组件值, 自定义初始值
const form = reactive<Form>({
  cols: 'grid-cols-1',
  dispaly: 'grid'
})
watch(form, () => {
  instance.attrs = { ...instance.attrs, class: [form.dispaly, form.cols] }
  instance.refAttrs = instance.attrs
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