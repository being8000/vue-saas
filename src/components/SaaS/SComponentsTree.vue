<template>
  <details
    class="w-[150px] item"
    open
  >
    <summary
      :class="[`l${refIns.level}`, {
        selected: refIns.selected,
        hovering: refIns.hovering
      }]"
      :id="`saas-tree-${refIns.uid}`"
      @mouseenter="instance.toggleHovering"
      @mouseleave="instance.toggleHovering"
    >

      <span @click.prevent.stop="onSelect">
        {{ refIns.vueComponent?.componentName }}[{{ refIns.uid }}]
      </span>
      <div class="icons">
        <div class="i-mdi-arrow-right-drop-circle collapse " />
        <div class="i-mdi-arrow-down-drop-circle  expand" />
      </div>
    </summary>
    <template
      v-for="item in refIns.children"
      :key="item.uid"
    >
      <SComponentsTree :instance="item" />
    </template>
  </details>
</template>

<script setup lang="ts">
import { saasApp } from '@/core';
import { Component, SComponentProps } from '@/core/components';
import { shallowRef, triggerRef } from 'vue';
const { instance } = defineProps<SComponentProps>()
const refIns = shallowRef(instance)
instance.onUpdated((com: Component) => {
  refIns.value = com
  triggerRef(refIns)
})

const onSelect = () => {
  saasApp.action.toggleSelect(instance)
}
</script>