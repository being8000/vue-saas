<template>
  <component
    :is="instance.vueComponent"
    v-bind="attrs"
    :instance="instance"
    @mouseenter.stop.prevent="onMouseEnter"
    @mouseleave.stop.prevent="onMouseleave"
    @click.stop.prevent="onClick"
    :class="['saas-item', `L${instance.level}`, {
      last: instance.children.length <= 0,
      selected: data.selected
    }]"
  >

    <!-- ParentContainer组件拖拽功能 -->
    <!-- handle=".tag" -->
    <template v-if="instance.level == 1">
      <draggable
        tag="div"
        v-model="instance.children"
        v-bind="dragOption"
        @start="drag = true"
        @end="drag = false"
        class="list-group"
        item-key="uid"
        @change="resort"
      >
        <template #item="{ element }">
          <div>
            <SComponent :instance="element" />
          </div>
        </template>
      </draggable>
    </template>
    <template v-else>
      <SComponent
        v-for="(item) in instance.children"
        :key="`${item.uid}+${item.pid}`"
        :instance="item"
      />
    </template>
    <!-- <div class="w-full text-center">
      <div class=" text-black text-2">{{ instance.type }} ,</div>
      <div class=" text-black text-2">index:{{ instance.index }} ,</div>
      <div class=" text-black text-2">uid:{{ instance.uid }} ,</div>
      <div class=" text-black text-2">parent: {{ instance.pid }}</div>
      <div class=" text-black text-2">level: {{ instance.level }}</div>
    </div> -->
  </component>
</template>
<script setup lang="ts">
import { saasApp } from '@/core';
import { SComponentProps, VueComponentData } from '@/core/components';
import { computed, onBeforeUnmount, onMounted, onUpdated, reactive, ref, shallowRef } from 'vue';
import Draggable from 'vuedraggable';
// import { drawer } from '@/core/types/renderBoarders'
const props = defineProps<SComponentProps>()
const instance = props.instance
const drag = ref(false)
const dragOption = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  }
})

// Vue功能逻辑代码
const children = ref(instance.children)
const attrs = shallowRef(instance.attrs)
// 绑定响应式对象到 SaaS组件上。 Children用于父组件更新子组件的CRUD

instance.setRefChildren(children)

// 绑定内部状态，这个值只用来SaaSComponent 更新内部值之后同步当前组件触发渲染
const data = reactive<VueComponentData>({
  selected: instance.selected,
  hovering: false
})
instance.setRefData(data)

const resort = () => {
  instance.children.map((el, index) => {
    el.index = index;
    // 重新绑定父节点
  });
}
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
  saasApp.action.toggleSelect(instance)
}
onMounted(() => {
})
onBeforeUnmount(() => {
})
// 组件重新渲染时候出发
onUpdated(() => {
})

</script>