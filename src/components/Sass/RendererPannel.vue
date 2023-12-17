<template>
  <div class="sass-renderer">
    <!-- 如果是个空数组则显示新增按钮 -->
    <div class="w-full text-center bg-coolGray">
      <button
        @click="undo"
        class="b-1 bg-cyan w-auto h-10 m-auto px-3"
      >Undo</button>
    </div>
    <section
      style="border: 1px solid black; border-top: none; border-bottom: none;"
      class=" w-2xl m-auto b-r b-l b-balck b-2 shadow-inset"
    >
      <RenderItem
        ref="vDom"
        :instance="children"
      />
    </section>

  </div>
</template>
<script setup lang="ts">
import RenderItem from './SComponent.vue'
import { onMounted, ref, onRenderTracked, onUpdated } from 'vue';
import { RendererPannelProps } from '@/sass/components';
import { sassApp } from '@/sass/index';
const props = defineProps<RendererPannelProps>()
const instance = sassApp.mount(props.data)


const children = ref(instance)
instance.setRefChildren(children)
const vDom = ref()
// 初始化 操作类示例，并统一加入数组

const undo = () => {
  sassApp.history.undo()
}
onMounted(() => {
})
onUpdated(() => {
  console.log('update')

})
onRenderTracked(() => {
  // console.log('tracked')
})
</script>

<style >
.sass-renderer .selected {
  border: 1px solid red;
}

.sass-renderer .L1:has(:hover) {
  border: 1px dashed blue;
}

.sass-renderer .last:hover {
  border: 1px dashed red;
}
</style>