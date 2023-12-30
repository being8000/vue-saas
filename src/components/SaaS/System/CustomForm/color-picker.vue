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
      @change="onChange"
      class="slider"
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, shallowRef } from 'vue';
import ColorPicker from 'primevue/colorpicker';
const props = defineProps<{
  modelValue: any,
  key?: string | undefined
}>()
const emits = defineEmits(['update:modelValue', "change"])
const defaultValue = !!props.modelValue ? (props.modelValue + '').replace('#', '') : ""
const value = computed({
  get() {
    return !!props.modelValue ? (props.modelValue + '').replace('#', '') : ""
  },
  set(value) {
    emits('update:modelValue', '#' + value)
    emits('change', '#' + value)
  }
})
const pickedColor = shallowRef(defaultValue)

const hidePalette = () => {
  value.value = pickedColor.value
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
