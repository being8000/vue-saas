<template>
  <div class="w-full text-center flex p-1">
    <div class="grow">
      01
    </div>
    <div class="m-auto grow-0 space-x-1">
      <Button
        @click="undo"
        class=" bg-cyan b-none "
        raised
        size="small"
      >Undo</Button>
      <Button
        @click="deleteItem"
        v-if="ButtonState.delete"
        raised
        size="small"
        class="bg-red b-none"
      >
        Delete
      </Button>
      <Button
        @click="addChild"
        raised
        size="small"
        v-if="ButtonState.addChild"
        class="bg-blue b-none"
      >
        AddChild
      </Button>
      <Button
        @click="copy"
        raised
        size="small"
        v-if="ButtonState.copy"
        class="bg-yellow b-none"
      >
        Copy
      </Button>
      <Button
        raised
        size="small"
        @click="toggleLayer"
        class=" bg-origin-border b-none"
      >
        {{ layerVisible ? "Hide" : "Show" }} Layers
      </Button>
    </div>
    <div class="grow">02</div>
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
const deleteItem = async () => {
  // console.log(instance)
  saasApp.action.delete()
}
const addChild = async () => {
  // console.log(instance)
  saasApp.action.addChild()
}
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