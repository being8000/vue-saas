<template>
  <component :is="props.tag" :node="node" v-bind="attrs" @click.stop="clickEvent" @mouseover.stop="onMouseover"
    @updatefromChild="updatefromChild" @mouseleave.stop="onMouseleave">
    <Item v-for="(item, index) in children" :key="item" :index="index" v-bind="item" :id="uid" :level="level + 1"
      :parentId="uid" />
    <div class="w-full text-center">
      <button @click="addComponent" class="b-1 text-3 bg-blue h-10 m-auto" v-if="props.level > 1">Add Node</button>
      <div class=" text-black text-2">uid:{{ uid }} ,</div>
      <div class=" text-black text-2">parent: {{ props.parentId }}</div>
    </div>
    <button @click="deleteItem" class="bg-red b-none p-1 rounded" v-if="props.level > 1">
      Delete
    </button>
  </component>
</template>
<script setup lang="ts">
import { ConcreteComponent, sassApp } from '@/core/types/index'
import { onBeforeUnmount, onMounted, onUpdated, reactive, ref, shallowRef } from 'vue';
import { events } from '@/core/eventsRegister'
import { Node } from '@/core/types/ComponentNode';
// import { drawer } from '@/core/types/renderBoarders'
const props = defineProps<Node & {
  level: number,
  index: number,
  parentId: number
}>()
const vDom = ref()
const emits = defineEmits(['updatefromChild'])
const uid = `${props.level}_${props.index || 0}`
// 初始化 操作类示例，并统一加入数组
const com = new ConcreteComponent(JSON.parse(JSON.stringify(props)))
com.uid = uid
com.parentId = props.parentId
com.level = props.level || 0
com.index = props.index
// 操作实例结束
const children = ref(props.children)
com.children = children
sassApp.add(com)

const deleteItem = async () => {
  // console.log(instance)
  sassApp.remove(com)

}

const addComponent = () => {
  sassApp.insert(com)
}

// Vue功能逻辑代码

const attrs = shallowRef(props.attrs)

// 向上递归遍历更新node. 不触发vue渲染
const updatefromChild = (index: number, nodes: Node[]) => {
  console.log('updatefromChild')
  console.log(index, nodes);
  (com.node.children[index] as Node).children = nodes;
  emits("updatefromChild", props.index, (com.node.children[index] as Node).children)
}

const I = reactive({
  hovering: false,
  selected: false
})

const clearItemStatus = () => {
  I.selected = false
  vDom.value?.classList.remove('selected')
}
const clickEvent = () => {
  events.emits()
  I.selected = !I.selected
  vDom.value?.classList.add('selected')
  if (I.selected) {
    events.register(clearItemStatus)
  }
}
const onMouseover = () => {
  I.hovering = true
  // if (vDom.value) {
  //   drawer.push({
  //     el: vDom.value,
  //     id: ID,
  //     level: props.level || 0,
  //     isLast: isLastNode.value
  //   })
  // }
}

const onMouseleave = () => {
  I.hovering = false
  // drawer.pop();
}

onMounted(() => {
  // console.log(getCurrentInstance(), vDom.value)
})
onBeforeUnmount(() => {
  sassApp.unmounted(com)
  console.log('unmounted')
  const node = JSON.parse(JSON.stringify(children.value))
  emits('updatefromChild', props.index, node)
  // console.log(getCurrentInstance(), vDom.value)
})
// 组件重新渲染时候出发
onUpdated(() => {
  console.log('updated')
  const node = JSON.parse(JSON.stringify(children.value))
  com.node.children = node
  emits('updatefromChild', props.index, node)
})

</script>