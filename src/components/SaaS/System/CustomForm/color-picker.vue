<template>
  <div class="color-container">

    <ColorPicker
      v-model="pickedColor"
      @hide="hidePalette"
      inputId="cp-hex"
      format="hex"
      :pt="{
        input: {
          style: 'height:15px;width:15px'
        }
      }"
    />
    <input
      v-model="value"
      maxlength="6"
      @input="onChange"
      class="slider"
    >
  </div>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import ColorPicker from 'primevue/colorpicker';
const props = defineProps<{
  modelValue: any,
  key?: string | undefined
}>()
const emits = defineEmits(['update:modelValue', "change"])
const defaultValue = !!props.modelValue ? (props.modelValue + '').replace('#', '') : ""
const value = shallowRef(defaultValue)
const pickedColor = shallowRef(defaultValue)
const onChange = () => {
  if (value.value.length <= 6) {
    return
  }
  emits('update:modelValue', '#' + value.value)
  emits('change', '#' + value.value)
}
const hidePalette = () => {
  value.value = pickedColor.value
  emits('update:modelValue', '#' + value.value)
  emits('change', '#' + value.value)
}
</script>

<style lang="scss" scoped>
.color-container {
  display: flex;
  align-items: center;

  input {
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
