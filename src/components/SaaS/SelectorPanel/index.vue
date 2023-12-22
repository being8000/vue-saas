<template>
  <div class="selector-pannel card flex justify-content-center ">
    <Sidebar
      v-model:visible="data.visible"
      :dismissable="false"
      :pt="{
        mask: {
          style: {
            animation: 'none',
            pointerEvents: 'none'
          }
        }
      }"
      header="组件选择面板"
      class="w-full md:w-15rem lg:w-20rem"
    >

      <div>
        当前选中：{{ data.selectedCom.vueComponent?.componentName }}
      </div>
      <div>
        <h4>请选则你需要添加得组件</h4>
        <section v-if="type == ComponentType.RootContainer || type == ComponentType.Root">
          <h5>系统组件</h5>
          <section class="flex">
            <Button @click="addChild">
              添加子容器
            </Button>
          </section>
        </section>
        <section v-if="type != ComponentType.Root">
          <h5>自定义组件 (测试专用)</h5>
          <div class="flex flex-wrap">
            <ComponentSelector
              v-for="(componentKey, index) in customComponents"
              :componentKey="componentKey"
              :index="index"
            />
          </div>
          <!-- <Button @click="replaceTo(`ImageComponent`)">
            Image
          </Button>
          <Button @click="replaceTo(`Breadcrumb`)">
            Breadcrumb
          </Button>
          <Button @click="replaceTo(`Carouel`)">
            Carouel
          </Button>
          <Button @click="replaceTo(`Message`)">
            Message
          </Button> -->
        </section>
      </div>
    </Sidebar>
  </div>
</template>
<script lang="ts" setup>
/**
 * L2 可以添加自定义组件以及子容器
 * L3 无法继续添加，可以替换当前层级为自定义组件
 */
import ComponentSelector from '../System/ComponentSelector.vue'
import { saasApp } from '@/core';
import { Component, ComponentType, SaasFakeComponent } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import { AppEventParameters } from '@/core/event-types';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import { computed, shallowRef, triggerRef } from 'vue';
const data = shallowRef<{
  visible: boolean,
  selectedCom: Component
}>({
  visible: false,
  selectedCom: new SaasFakeComponent({})
})

const customComponents = [
  "ImageComponent", "Breadcrumb", "Carouel", "Message"
]

const type = computed(() => {
  return data.value.selectedCom.type
})

const addChild = () => {
  saasApp.action.addChild()
}


const subSelect = (param: AppEventParameters) => {
  data.value.selectedCom = param.component
  data.value.visible = true
  triggerRef(data)
}
const appCancelSelect = (param: AppEventParameters) => {
  data.value.selectedCom = param.component
  data.value.visible = false
  triggerRef(data)
}
appEvents.subscribe("appSelect", subSelect)
appEvents.subscribe("appCancelSelect", appCancelSelect)
</script>

<style lang="scss" scoped>
.translate-enter-active {
  animation: translate-in 0.3s;
}

.translate-leave-active {
  animation: translate-in 0.3s reverse;
}

@keyframes translate-in {
  0% {
    transform: translate(-100%, 0px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}
</style>