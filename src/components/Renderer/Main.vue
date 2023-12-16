<template>
  <div class="render-dashboard">
    <RenderItem ref="vDom" :tag="item.tag" :children="item.children" :attrs="item.attrs" :level="1" :id="uid" />
    <!-- 如果是个空数组则显示新增按钮 -->
    <div class="w-full text-center bg-coolGray">
      <button @click="undo" class="b-1 bg-cyan w-auto h-10 m-auto px-3">Undo</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import RenderItem from './Item.vue'
import { sassApp } from '@/core/types/index'
import { onMounted, ref, onRenderTracked, onUpdated } from 'vue';
import { RendererProps } from '@/core/types/ComponentNode';
const props = defineProps<RendererProps>()
const item = ref(props.data)
const uid = ref(Symbol())
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
</style>