<template>
  <div class="input-container">
    <input
      v-model="value"
      maxlength="2"
      @change="onChange"
      class="slider"
      oninput="value=value.match(/\d*\.?\d*/g,'')[0]"
      :style="{
        width: props.config.width
      }"
    >
    <span class="pl-1">
      {{ config.unit }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { CusNumer } from '@/core/props-type';
import { computed } from 'vue';
const props = defineProps<{
  modelValue: any,
  key?: string | undefined
  config: CusNumer
}>()
const emits = defineEmits(['update:modelValue', "change"])
const value = computed({
  get() {
    return !!props.modelValue ? (props.modelValue + '').replace((props.config.unit) + '', '') : 0
  },
  set(value) {
    emits('update:modelValue', value + (props.config.unit || 'px'))
  }
})
const onChange = () => {
  emits('change', value + (props.config.unit || 'px'))
}
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  align-items: center;

  input {
    width: 100%;
    max-width: 80px;
    display: inline-block;
    margin-left: 5px;
    border: 1px solid #c8cccf;
    border-radius: 3px;

    &:focus {
      border-color: var(--primary-color);
    }

    &:focus-visible {
      outline: none;
    }
  }
}
</style>
