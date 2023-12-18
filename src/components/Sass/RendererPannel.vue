<template>
  <div class="sass-renderer">
    <!-- 如果是个空数组则显示新增按钮 -->
    <div class="w-full text-center bg-coolGray p-2">
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
      <button
        @click="layerVisible = !layerVisible"
        class=" bg-origin-border b-none p-1 rounded inline-block mx-2"
      >
        {{ layerVisible ? "Hide" : "Show" }} Layers
      </button>
    </div>
    <SelectorPanel />
    <section
      class="max-w-2xl m-auto b-r b-l b-balck b-2 shadow-inset render-container"
      :class="{
        layers: layerVisible
      }"
    >
      <RenderItem
        ref="vDom"
        :instance="children"
      />
    </section>
    <!-- <FloatingBar /> -->
  </div>
</template>
<script setup lang="ts">
import SelectorPanel from './SelectorPanel/index.vue'
import { Container } from '@/core/container';
import { appEvents } from '@/core/event-manager';
import { sassApp } from '@/core/index';
import { ComponentType } from '@/core/components';
import { onMounted, onRenderTracked, onUpdated, ref } from 'vue';
// import FloatingBar from './FloatingBar/Bar.vue';
import RenderItem from './SComponent.vue';
const layerVisible = ref(false)
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
// sassApp.action.toggleSelect(children.value)
const vDom = ref()
// 初始化 操作类示例，并统一加入数组
const undo = () => {
  sassApp.history.undo()
}
onMounted(() => {
})
onUpdated(() => {

})
onRenderTracked(() => {
  // console.log('tracked')
})
</script>

<style lang="scss">
.render-container {
  min-height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  .tag {
    display: none;
  }

  &.layers .tag {
    display: block;
    background-color: rgb(92, 91, 94);
    width: max-content;
    padding: 2px 5px;
    font-size: 10px;
    color: rgb(255, 255, 255);
    border-radius: 3px;
    margin: 0px;
    transform: translateX(100%);
    margin-left: auto;
  }

  .selected>.tag {
    background-color: rgb(4, 153, 16);
  }
}

.sass-renderer {

  .sass-item {
    position: relative;
  }

  .sass-item::after {
    width: calc(100% + 0px);
    height: calc(100% + 0px);
    position: absolute;
    top: -1px;
    left: -1px;
    border: 1px dashed darkgray;
    content: "";
    border-radius: 3px;
    pointer-events: none;
    z-index: 1;
  }

  .sass-item.selected::after {
    border: 2px solid rgb(6, 34, 58);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .sass-item:not(.L1):has(.selected) {
    border: 1px dashed rgb(39, 1, 54);
  }
}
</style>