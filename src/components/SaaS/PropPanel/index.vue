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
      header="属性面板"
      position="right"
      class="w-full md:w-15rem lg:w-20rem"
    >
      <BaseStyle :instance="data.selectedCom" />
      <ComponentProps
        :instance="data.selectedCom"
        class="py-2"
      />
    </Sidebar>
  </div>
</template>
<script lang="ts" setup>
import { Component, SaaSComponent } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import { AppEventParameters } from '@/core/event-types';
import Sidebar from 'primevue/sidebar';
import { ref, shallowRef, triggerRef } from 'vue';
import BaseStyle from './BaseStyle.vue';
import ComponentProps from './Props.vue';

const data = shallowRef<{
  selectedCom: Component,
  visible: boolean
}>({
  selectedCom: new SaaSComponent({}),
  visible: false
})
const visible = ref(false)
const appSelect = (params: AppEventParameters) => {
  data.value.selectedCom = params.component
  data.value.visible = true
  triggerRef(data)
}
const appCancelSelect = (params: AppEventParameters) => {
  data.value.selectedCom = params.component
  data.value.visible = false
  triggerRef(data)
}
appEvents.subscribe("appSelect", appSelect)
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