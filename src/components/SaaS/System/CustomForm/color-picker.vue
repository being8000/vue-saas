<template>
  <div class="color-container">

    <ColorPicker
      v-model="pickedColor"
      @hide="hidePalette"
      inputId="cp-hex"
      format="hex"
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
import { shallowRef, toRaw } from 'vue';
import ColorPicker from 'primevue/colorpicker';
const props = defineProps<{
  modelValue: any,
  key?: string | undefined
}>()
const emits = defineEmits(['update:modelValue', "change"])
const value = shallowRef(props.modelValue)
const pickedColor = shallowRef(toRaw(value))
const onChange = () => {
  if (value.value.length <= 6) {
    return
  }
  emits('update:modelValue', value)
  emits('change', value)
}
const hidePalette = () => {
  value.value = pickedColor.value
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<style lang="scss" scoped>
.color-container {
  display: flex;
  align-items: center;

  input {
    width: 60px;
    display: inline-block;
    margin-left: 5px;
    border-color: #555;
    border-radius: 3px;
  }
}
</style>
