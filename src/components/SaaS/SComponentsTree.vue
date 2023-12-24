<template>
  <details class="w-[150px] item">
    <summary :class="[`l${refIns.level}`, {
      selected: refIns.selected
    }]">
      <span @click.prevent.stop="onSelect">
        {{ refIns.tag }}
      </span>
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