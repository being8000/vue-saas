<template>
  <div class="sass-renderer">
    <!-- 如果是个空数组则显示新增按钮 -->
    <div class="w-full text-center bg-coolGray p-2">
      <div>Try to select Component, click the yellow section.</div>
      <div>尝试去选择一下组件，点击黄色区域</div>
      <button
        @click="undo"
        class=" bg-cyan b-none p-1 rounded inline-block mx-2"
      >Undo</button>
      <button
        @click="deleteItem"
        v-if="buttonState.delete"
        class="bg-red b-none p-1 rounded inline-block mx-2"
      >
        Delete
      </button>
      <button
        @click="addChild"
        v-if="buttonState.addChild"
        class="bg-blue b-none p-1 rounded inline-block mx-2"
      >
        AddChild
      </button>
      <button
        @click="copy"
        v-if="buttonState.copy"
        class="bg-yellow b-none p-1 rounded inline-block mx-2"
      >
        Copy
      </button>
    </div>
    <section class="max-w-2xl m-auto b-r b-l b-balck b-2 shadow-inset render-container">
      <RenderItem
        ref="vDom"
        :instance="children"
      />
    </section>
    <!-- <FloatingBar /> -->
  </div>
</template>
<script setup lang="ts">
import { Container } from '@/sass/container';
import { appEvents } from '@/sass/event-manager';
import { sassApp } from '@/sass/index';
import { ComponentType } from '@/sass/components';
import { onMounted, onRenderTracked, onUpdated, ref } from 'vue';
// import FloatingBar from './FloatingBar/Bar.vue';
import RenderItem from './SComponent.vue';
const buttonState = ref({
  delete: false,
  addChild: false,
  copy: false
})
appEvents.subscribe("appSelect", (data) => {
  if (data.component.type == ComponentType.Root) {
    buttonState.value = {
      delete: false,
      addChild: true,
      copy: false
    }
  }
  if (data.component.type == ComponentType.RootContainer) {
    buttonState.value = {
      delete: true,
      addChild: true,
      copy: true
    }
  }
  if (data.component.type == ComponentType.ChildContainer) {
    buttonState.value = {
      delete: true,
      addChild: true,
      copy: true
    }
  }
  if (data.component.type == ComponentType.CustomComponent) {
    buttonState.value = {
      delete: true,
      addChild: false,
      copy: true
    }
  }
  console.log(buttonState.value)
})
appEvents.subscribe("appCancelSelect", () => {
  buttonState.value = {
    delete: false,
    addChild: false,
    copy: false
  }
})

const instance = sassApp.mount(Container.initRoodNode())

const deleteItem = async () => {
  // console.log(instance)
  sassApp.action.delete()
}
const addChild = async () => {
  // console.log(instance)
  sassApp.action.addChild()
}
const copy = () => {
  sassApp.action.copy()
}
const children = ref(instance)
instance.setRefChildren(children)
sassApp.action.toggleSelect(children.value)
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

<style lang="scss">
.sass-item {
  position: relative;
  border: 1px dashed darkgray;
}

.render-container {
  min-height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.sass-renderer .sass-item.selected::after {
  width: calc(100% + 0px);
  height: calc(100% + 0px);
  position: absolute;
  top: -1px;
  left: -1px;
  border: 2px solid rgb(6, 34, 58);
  content: "";
  border-radius: 3px;
  pointer-events: none;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.sass-renderer {

  .L1:has(:hover),

  .sass-item:not(.L1):hover,
  .sass-item:not(.L1):has(.selected) {

    border: 1px dashed rgb(39, 1, 54);
  }
}
</style>