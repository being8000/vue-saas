<template>
  <div class="saas-renderer">

    <!-- 如果是个空数组则显示新增按钮 -->
    <FloatingBar />
    <!-- <CssGrid /> -->
    <SelectorPanel />
    <PropPanel />
    <section class="max-w-2xl m-auto mt-2 b-r b-l b-balck b-2 shadow-inset layers render-container">
      <RenderItem
        ref="vDom"
        :instance="$ref"
      />
    </section>
    <!-- <FloatingBar /> -->
  </div>
</template>
<script setup lang="ts">
// import CssGrid from '@/components/CssGrid.vue'
import { Container } from '@/core/container';
import { saasApp } from '@/core/index';
import { onMounted, onRenderTracked, onUpdated, shallowRef } from 'vue';
import FloatingBar from './FloatingBar/Bar.vue';
import RenderItem from './SComponent.vue';
import SelectorPanel from './SelectorPanel/index.vue';
import PropPanel from './PropPanel/index.vue';

const instance = saasApp.mount(Container.initRootNode())
const $ref = shallowRef(instance)
instance.$ref = $ref

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


.saas-item::after {
  width: calc(100% + 0px);
  height: calc(100% + 0px);
  position: absolute;
  top: -1px;
  left: -1px;
  margin: 0 -1px -1px 0;
  border: 1px dashed darkgray;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  content: "";
  pointer-events: none;
  z-index: 1;
}



// .saas-item.L3:nth-child(odd)::after {
//   border-left: none;
// }

// .saas-item.L2,
// .saas-item.L3:nth-last-of-type() {
//   border-bottom: 1px dashed darkgray;
// }

.render-container {
  min-height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;


  .L1 {
    min-height: 100vh;
  }

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
  }

  .saas-item.selected {
    transform: translateX(1px);
    box-shadow: #7254f3 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

}
</style>