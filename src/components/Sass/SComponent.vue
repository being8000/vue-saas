<template>
  <component
    :is="instance.tag"
    v-bind="attrs"
    @mouseenter.stop.prevent="onMouseEnter"
    @mouseleave.stop.prevent="onMouseleave"
    @click.stop.prevent="onClick"
    :class="['sass-item', `L${instance.level}`, {
      last: instance.children.length <= 0,
      selected: data.selected
    }]"
  >
    <template v-if="instance.type == ComponentType.CustomComponent">
      CustomComponent
    </template>
    <template v-else-if="children.length == 0">
      Empty
    </template>
    <template v-else>
      <SComponent
        v-for="(item) in children"
        :key="`${item.uid}+${item.pid}`"
        :instance="item"
      />
    </template>
    <div class="w-full text-center">
      <div class=" text-black text-2">index:{{ instance.index }} ,</div>
      <div class=" text-black text-2">uid:{{ instance.uid }} ,</div>
      <div class=" text-black text-2">parent: {{ instance.pid }}</div>
      <div class=" text-black text-2">level: {{ instance.level }}</div>
    </div>
  </component>
</template>
<script setup lang="ts">
import { sassApp } from '@/sass';
import { SComponentProps, ComponentType, VueComponentData } from '@/sass/components';
import { onBeforeUnmount, onMounted, onUpdated, reactive, ref, shallowRef } from 'vue';
// import { drawer } from '@/core/types/renderBoarders'
const props = defineProps<SComponentProps>()
const instance = props.instance



// Vue功能逻辑代码
const children = ref(instance.children)
const attrs = shallowRef(instance.attrs)
// 绑定响应式对象到 Sass组件上。 Children用于父组件更新子组件的CRUD

instance.setRefChildren(children)

// 绑定内部状态，这个值只用来SassComponent 更新内部值之后同步当前组件触发渲染
const data = reactive<VueComponentData>({
  selected: instance.selected,
  hovering: false
})
instance.setRefData(data)
const onMouseEnter = () => {
  if (instance.children.length <= 0) {
    data.hovering = true
  }
}

const onMouseleave = () => {
  if (instance.children.length <= 0) {
    data.hovering = false
  }
}
const onClick = () => {
  sassApp.select(instance)
}
onMounted(() => {
})
onBeforeUnmount(() => {
})
// 组件重新渲染时候出发
onUpdated(() => {
})

</script>