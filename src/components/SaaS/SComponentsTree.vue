<template>
  <details
    class="w-[150px] item"
    open
  >
    <summary
      :class="[`l${refIns.level}`, {
        selected: refIns.selected
      }]"
      :id="`saas-tree-${refIns.uid}`"
    >

      <span @click.prevent.stop="onSelect">
        {{ refIns.vueComponent?.componentName }}[{{ refIns.uid }}]
      </span>
      <div class="icons">
        <div class="i-mdi-arrow-collapse-vertical  " />
        <div class="i-mdi-arrow-expand-vertical  " />
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