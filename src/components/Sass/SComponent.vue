<template>
  <component
    :is="instance.tag"
    v-bind="attrs"
    @mouseover.stop="onMouseover"
    @mouseleave.stop="onMouseleave"
  >
    <SComponent
      v-for="(item) in children"
      :key="item.uid"
      :instance="item"
    />
    <div class="w-full text-center">
      <div class=" text-black text-2">index:{{ instance.index }} ,</div>
      <div class=" text-black text-2">uid:{{ instance.uid }} ,</div>
      <div class=" text-black text-2">parent: {{ instance.pid }}</div>
    </div>
    <div>
      <button
        @click="deleteItem"
        class="bg-red b-none p-1 rounded inline-block"
        v-if="instance.level > 0"
      >
        Delete
      </button>
      <button
        @click="addChild"
        class="bg-blue b-none p-1 rounded inline-block "
        v-if="instance.level > 0"
      >
        AddChild
      </button>
      <button
        @click="copy"
        class="bg-yellow b-none p-1 rounded inline-block "
        v-if="instance.level > 0"
      >
        Copy
      </button>
    </div>
  </component>
</template>
<script setup lang="ts">
import { sassApp } from '@/sass';
import { SComponentProps } from '@/sass/components';
import { onBeforeUnmount, onMounted, onUpdated, reactive, ref, shallowRef } from 'vue';
// import { drawer } from '@/core/types/renderBoarders'
const props = defineProps<SComponentProps>()
const instance = props.instance

const deleteItem = async () => {
  // console.log(instance)
  sassApp.delete(instance)

}
const addChild = async () => {
  // console.log(instance)
  sassApp.addChild(instance)
}
const copy = () => {
  sassApp.copy(instance)
}

// Vue功能逻辑代码
const children = ref(instance.children)
const attrs = shallowRef(instance.attrs)
instance.setRef(children)
const I = reactive({
  hovering: false,
  selected: false
})


const onMouseover = () => {
  I.hovering = true
  // if (vDom.value) {
  //   drawer.push({
  //     el: vDom.value,
  //     id: ID,
  //     level: instance.level || 0,
  //     isLast: isLastNode.value
  //   })
  // }
}

const onMouseleave = () => {
  I.hovering = false
  // drawer.pop();
}

onMounted(() => {
})
onBeforeUnmount(() => {
})
// 组件重新渲染时候出发
onUpdated(() => {
})

</script>