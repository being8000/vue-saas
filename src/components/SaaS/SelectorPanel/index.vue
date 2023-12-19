<template>
  <div class="selector-pannel card flex justify-content-center ">
    <Sidebar
      v-model:visible="visible"
      :dismissable="false"
      :pt="{
        mask: {
          class: 'testsss',
          style: {
            animation: 'none',

          }
        }
      }"
      header="Sidebar"
      class="w-full md:w-15rem lg:w-20rem"
    >

      <div>
        当前选中：{{ selectedCom?.type }}
      </div>
      <div>
        <h4>请选则你需要添加得组件</h4>
        <section>
          <h5>系统组件</h5>
          <section class="flex">
            <button @click="addChild">
              ChildContainer
            </button>
          </section>
        </section>
        <section>
          <h5>自定义组件</h5>
          <button @click="addVueComponent">
            Image
          </button>
        </section>
      </div>
    </Sidebar>
  </div>
</template>
<script lang="ts" setup>
import Sidebar from 'primevue/sidebar';
import { saasApp } from '@/core';
import { Component, SaaSComponent } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import { AppEventParameters } from '@/core/event-types';
import { ref } from 'vue';
const visible = ref(false)
let selectedCom: Component = new SaaSComponent({})


const addChild = () => {
  saasApp.action.addChild()
}
const addVueComponent = () => {
  saasApp.action.addVueComponentChild("ImageComponent")
}

const subSelect = (data: AppEventParameters) => {
  selectedCom = data.component
  visible.value = true
}
const appCancelSelect = (data: AppEventParameters) => {
  selectedCom = data.component
  visible.value = false
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