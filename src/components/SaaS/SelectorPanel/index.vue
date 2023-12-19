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
        当前选中：{{ type }}
      </div>
      <div>
        <h4>请选则你需要添加得组件</h4>
        <section>
          <h5>系统组件</h5>
          <section class="flex">
            <Button
              @click="addChild"
              v-if="type == ComponentType.RootContainer"
            >
              ChildContainer
            </Button>
          </section>
        </section>
        <section class="space-x-2 space-y-2">
          <h5>自定义组件 (测试专用)</h5>
          <Button @click="replaceTo(`ImageComponent`)">
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
          </Button>
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
import { saasApp } from '@/core';
import { Component, SaaSComponent, ComponentType } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import { AppEventParameters } from '@/core/event-types';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import { computed, reactive } from 'vue';
const data = reactive<{
  visible: boolean,
  selectedCom: Component
}>({
  visible: false,
  selectedCom: new SaaSComponent({})
})

const type = computed(() => {
  return data.selectedCom.type
})

const addChild = () => {
  saasApp.action.addChild()
}
const replaceTo = (name: string) => {
  saasApp.action.replaceTo(name)
}

const subSelect = (param: AppEventParameters) => {
  data.selectedCom = param.component
  data.visible = true
}
const appCancelSelect = (param: AppEventParameters) => {
  data.selectedCom = param.component
  data.visible = false
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

.selector-pannel {}
</style>