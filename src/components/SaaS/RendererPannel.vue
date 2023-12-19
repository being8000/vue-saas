<template>
  <div class="saas-renderer">

    <!-- 如果是个空数组则显示新增按钮 -->
    <FloatingBar />
    <SelectorPanel />
    <PropPanel />
    <section class="max-w-2xl m-auto b-r b-l b-balck b-2 shadow-inset layers render-container">
      <RenderItem
        ref="vDom"
        :instance="children"
      />
    </section>
    <!-- <FloatingBar /> -->
  </div>
</template>
<script setup lang="ts">
import { Container } from '@/core/container';
import { saasApp } from '@/core/index';
import { onMounted, onRenderTracked, onUpdated, ref } from 'vue';
import FloatingBar from './FloatingBar/Bar.vue';
import RenderItem from './SComponent.vue';
import SelectorPanel from './SelectorPanel/index.vue';
import PropPanel from './PropPanel/index.vue';


const instance = saasApp.mount(Container.initRoodNode())

const children = ref(instance)
instance.setRefChildren(children)
// saasApp.action.toggleSelect(children.value)

onMounted(() => {
})
onUpdated(() => {

})
onRenderTracked(() => {
  // console.log('tracked')
})
</script>

<style lang="scss">
@import './render.scss';

.render-container {
  min-height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  .tag {
    display: none;
  }

  &.layers .saas-item {
    padding-top: 20px;
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
    margin-left: auto;
    position: absolute;
    left: 0%;
    top: 0px;
  }

  .selected>.tag {
    background-color: rgb(4, 153, 16);
  }
}

.saas-renderer {

  .saas-item {
    position: relative;
    box-sizing: border-box;
    display: block;
  }

  .saas-item::after {
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

  .saas-item.selected::after {
    border: 2px solid rgb(6, 34, 58);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .saas-item:not(.L1):has(.selected) {
    border: 1px dashed rgb(39, 1, 54);
  }
}
</style>