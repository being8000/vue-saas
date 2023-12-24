<template>
  <div class="saas-renderer">

    <!-- 如果是个空数组则显示新增按钮 -->
    <FloatingBar />
    <!-- <CssGrid /> -->
    <SelectorPanel />
    <PropPanel />
    <div class="fixed left-0 p-3">
      <h2 class="text-[var(--primary-color)]">功能描述</h2>
      <li>新增根容器</li>
      <li>根容器可新增子容器或者自定义组件</li>
      <li>子容器可以新增自定义组件，但是只能新增一个，<br>重新选择其他组件默认会变成替换操作</li>
      <li>可自定义组件基础样式</li>
      <li>可灵活开发新组件，并且可灵活配置属性编辑面板</li>
      <ul>
        <h4 class="text-[var(--primary-color)]">组件的基本功能</h4>
        <div class="flex space-x-6">
          <li>新增</li>
          <li>复制</li>
          <li>删除</li>
          <li>撤回</li>
          <li>替换</li>
          <li>父级容器拖拽</li>
        </div>
      </ul>
      <ul>
        <h4 class="text-[var(--primary-color)]">后续功能</h4>
        <div class="">
          <li>模拟商城组件完善</li>
          <li>商城预览</li>
          <li>商品组件</li>
          <li>活动组件</li>
          <li>促销组件</li>
          <li>商城模板导入，保存功能</li>
        </div>
      </ul>
    </div>
    <section class="flex m-auto mt-5 b-r b-l b-balck b-2 shadow-inset layers render-container">

      <PhoneScreen>
        <RenderItem :instance="instance" />
      </PhoneScreen>
      <div class="ml-3 tree w-200px">
        <SComponentsTree :instance="instance" />
      </div>
    </section>
    <!-- <FloatingBar /> -->
  </div>
</template>
<script setup lang="ts">
// import CssGrid from '@/components/CssGrid.vue'
import PhoneScreen from '@/components/Phone/iphone14.vue'
import SComponentsTree from './SComponentsTree.vue'
import { Container } from '@/core/container';
import { saasApp } from '@/core/index';
import { onMounted, onRenderTracked, onUpdated } from 'vue';
import FloatingBar from './FloatingBar/Bar.vue';
import RenderItem from './SComponent.vue';
import SelectorPanel from './SelectorPanel/index.vue';
import PropPanel from './PropPanel/index.vue';

const instance = saasApp.mount(Container.initRootNode())

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
@import './tree.scss';


.saas-item:hover::after {
  width: calc(100% + 0px);
  height: calc(100% + 0px);
  position: absolute;
  top: 0px;
  left: 0px;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 0px 1px;
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

  width: max-content;


  .L1 {
    min-height: 100%;
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
    z-index: 10;
    transform: translateX(0px);
    box-shadow: #7254f3 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

}
</style>