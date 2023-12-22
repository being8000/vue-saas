<template>
  <div class="w-full text-center grid grid-cols-3 p-1 pl-3 sticky top-0 bg-white shadow-lg z-10">
    <div class="grow text-left flex items-center">
      <h3 class="m-0 pl">模拟商城装修系统</h3>
    </div>
    <div class="m-auto grow-0 space-x-1 text-center">


      <Button
        raised
        size="small"
        @click="toggleLayer"
        class=" bg-origin-border b-none"
      >
        {{ layerVisible ? "隐藏" : "显示" }}层级
      </Button>
      <Button
        @click="addRootContainer"
        raised
        size="small"
        class="bg-blue b-none"
      >
        添加根容器
      </Button>
      <Button
        @click="undo"
        class=" bg-cyan b-none "
        raised
        size="small"
      >撤回</Button>
      <Button
        @click="deleteItem"
        :style="{
          visibility: ButtonState.delete ? 'visible' : 'hidden'
        }"
        raised
        size="small"
        class="bg-red b-none"
      >
        删除
      </Button>

      <Button
        @click="copy"
        raised
        size="small"
        :style="{
          visibility: ButtonState.copy ? 'visible' : 'hidden'
        }"
        class="bg-yellow b-none"
      >
        复制节点
      </Button>
    </div>
    <div class="grow text-right flex items-center justify-end">
      <a href="https://github.com/being8000/vue-sass">
        <img
          src="@/assets/github.svg"
          alt=""
          srcset=""
          class="w-7 mr-3 cursor-pointer"
        >
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { saasApp } from '@/core';
import { ComponentType } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import Button from 'primevue/button';
import { ref } from 'vue';

const layerVisible = ref(true)
const ButtonState = ref({
  delete: false,
  addChild: false,
  copy: false
})
const toggleLayer = () => {
  layerVisible.value = !layerVisible.value
  if (layerVisible.value) {
    document.querySelector(".render-container")?.classList.add("layers")
  } else {
    document.querySelector(".render-container")?.classList.remove("layers")
  }
}
const addRootContainer = () => {
  saasApp.action.addRootContainer()
}
const deleteItem = async () => {
  // console.log(instance)
  saasApp.action.delete()
}
// const addChild = async () => {
//   // console.log(instance)
//   saasApp.action.addChild()
// }
const copy = () => {
  saasApp.action.copy()
}
// 初始化 操作类示例，并统一加入数组
const undo = () => {
  saasApp.history.undo()
}
appEvents.subscribe("appSelect", (data) => {
  if (data.component.type == ComponentType.Root) {
    ButtonState.value = {
      delete: false,
      addChild: true,
      copy: false
    }
  }
  if (data.component.type == ComponentType.RootContainer) {
    ButtonState.value = {
      delete: true,
      addChild: true,
      copy: true
    }
  }
  if (data.component.type == ComponentType.ChildContainer) {
    ButtonState.value = {
      delete: true,
      addChild: true,
      copy: true
    }
  }
  if (data.component.type == ComponentType.CustomComponent) {
    ButtonState.value = {
      delete: true,
      addChild: false,
      copy: true
    }
  }
})
appEvents.subscribe("appCancelSelect", () => {
  ButtonState.value = {
    delete: false,
    addChild: false,
    copy: false
  }
})




</script>

<style lang="scss" scoped>
.flaoting-bar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>