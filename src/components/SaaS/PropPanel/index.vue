<template>
  <div class="selector-pannel card flex justify-content-center ">
    <Sidebar
      v-model:visible="visible"
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
      <ComponentLayout />
      <BaseStyle />
    </Sidebar>
  </div>
</template>
<script lang="ts" setup>
import Sidebar from 'primevue/sidebar';
import { Component, SaaSComponent } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import { AppEventParameters } from '@/core/event-types';
import { ref } from 'vue';
import BaseStyle from './BaseStyle.vue'
import ComponentLayout from './Layout.vue'

let selectedCom: Component = new SaaSComponent({})
console.log(selectedCom)
const visible = ref(false)
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