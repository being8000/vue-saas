<template>
  <div>
    <Transition name="translate">
      <div
        v-show="visible"
        class="selector-pannel"
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
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { sassApp } from '@/core';
import { Component, SassComponent } from '@/core/components';
import { appEvents } from '@/core/event-manager';
import { AppEventParameters } from '@/core/event-types';
import { ref } from 'vue';
const visible = ref(false)
let selectedCom: Component = new SassComponent({})


const addChild = () => {
  sassApp.action.addChild()
}
const addVueComponent = () => {
  sassApp.action.addVueComponentChild("ImageComponent")
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

.selector-pannel {
  position: fixed;
  padding: 10px;
  left: 0;
  top: 0;
  z-index: 999;
  width: 300px;
  max-width: 90vw;
  background-color: white;
  height: 100vh;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
</style>