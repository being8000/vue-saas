<template>
  <div class="slide-container">
    <input
      type="range"
      :min="config.min"
      :max="config.max"
      v-model="value"
      :step="config.step"
      @input="onChange"
      class="slider"
    >
    <span>{{ value }} {{ config.unit || 'px' }}</span>
  </div>
</template>

<script lang="ts" setup>
import { Slider } from '@/core/props-type';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: any,
  config: Slider,
  key?: string | undefined
}>()
const emits = defineEmits(['update:modelValue', "change"])
const value = ref(props.modelValue)
const onChange = () => {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<style lang="scss" scoped>
.slide-container {
  width: max-content;
  position: relative;
  width: 100%;

  input {
    width: 60%;
    display: inline-block;
  }

  &>span {
    display: inline-block;
    margin-left: 5px;
    width: 35%;
    font-size: 10px;
  }

  /* The slider itself */
  .slider {
    -webkit-appearance: none;
    /* Override default CSS styles */
    appearance: none;
    /* Full-width */
    /* Specified height */
    background: #d5d5d5;
    /* Grey background */
    outline: none;
    /* Remove outline */
    opacity: .8;
    /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s;
    /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    border-radius: 50px;
  }

  /* Mouse-over effects */
  .slider:hover {
    opacity: 1;
    /* Fully shown on mouse-over */
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    width: 10px;
    /* Set a specific slider handle width */
    height: 10px;
    /* Slider handle height */
    background: var(--primary-color);
    border-radius: 50%;
    /* Green background */
    cursor: pointer;
    /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    width: 25px;
    /* Set a specific slider handle width */
    height: 25px;
    /* Slider handle height */
    background: #04AA6D;
    /* Green background */
    cursor: pointer;
    /* Cursor on hover */
  }
}
</style>
