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
        },
        header: {
          style: {
            display: 'none'
          }
        }
      }"
      position="right"
      class="w-full md:w-15rem lg:w-20rem pt-2"
    >
      <BaseStyle
        :instance="data.selectedCom"
        :key="data.selectedCom.uid"
      />
      <ComponentProps
        :instance="data.selectedCom"
        :key="data.selectedCom.tag"
        class="py-2"
      />
    </Sidebar>
  </div>
</template>
<script lang="ts" setup>
import { useSubscribe } from '@/composables/useSubscribe';
import { Component, SaaSComponent } from '@/core/components';
import { AppEventParameters } from '@/core/event-types';
import Sidebar from 'primevue/sidebar';
import { shallowRef, triggerRef } from 'vue';
import BaseStyle from './BaseStyle.vue';
import ComponentProps from './Props.vue';

const data = shallowRef<{
  selectedCom: Component,
  visible: boolean
}>({
  selectedCom: new SaaSComponent({}),
  visible: false
})
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
useSubscribe("appSelect", appSelect)
useSubscribe("appCancelSelect", appCancelSelect)
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