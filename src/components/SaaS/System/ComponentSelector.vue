<template>
  <div
    class="component-template w-[100px] h-100px inline-block m-1 shadow-lg p-2 overflow-hidden"
    @click="addVueComponentChild(props.componentKey)"
  >
    <div class=" font-bold text-3">{{ component?.componentName }}</div>
    <section class="  overflow-hidden w-full  flex justify-center items-center  cursor-pointer">
      <component
        :is="component?.component"
        class=" pointer-events-none"
      ></component>
    </section>
  </div>
</template>
<script setup lang="ts">
import { saasApp } from "@/core";
import { saasVueComponents } from "@/core/register-component";
const props = defineProps<{
  componentKey: string
}>()

const component = saasVueComponents.find(props.componentKey)

const addVueComponentChild = (name: string) => {
  saasApp.action.addVueComponentChild(name)
}
</script>
