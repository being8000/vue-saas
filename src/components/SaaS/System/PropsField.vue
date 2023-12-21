<template>
  <div
    class="props-field"
    :class="{
      'inline-layout': props.inline
    }"
  >
    <section class="title font-black text-3 py-2">
      {{ props.label }}
    </section>
    <template v-if="props.type == 'radio'">
      <CusRadioButton
        :key="props.key"
        :config="(props.config as LabelValue[])"
        v-model="value"
        @change="emits('update:modelValue', value)"
      />
    </template>
    <template v-if="props.type == 'slider'">
      <CusSlider
        :key="props.key"
        :config="(props.config as Slider)"
        v-model="value"
        @change="emits('update:modelValue', value)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { LabelValue, Slider } from '@/core/props-type';
import { PropsFieldType } from '@/core/props-type';
import CusRadioButton from './CustomForm/radio-button.vue'
import CusSlider from './CustomForm/slider.vue'
import { ref } from 'vue';

const props = defineProps<PropsFieldType & {
  modelValue: any,
  inline?: boolean
}>()
const emits = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)
</script>

<style lang="scss" scoped>
.inline-layout {
  display: flex;
  flex-direction: row;
  align-items: center;

  &>:nth-child(1) {
    margin-right: 5px;
    min-width: 20%;
  }
}
</style>
