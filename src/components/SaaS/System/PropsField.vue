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
    <template v-else-if="props.type == 'slider'">
      <CusSlider
        :key="props.key"
        :config="(props.config as Slider)"
        v-model="value"
        @change="emits('update:modelValue', value)"
      />
    </template>
    <template v-else-if="props.type == 'color'">
      <CusColorPicker
        :key="props.key"
        v-model="value"
        @change="emits('update:modelValue', value)"
      />
    </template>
    <template v-else-if="props.type == 'image'">
      <CusUploader
        :key="props.key"
        v-model="value"
        @change="emits('update:modelValue', value)"
      />
    </template>
    <template v-else-if="props.type == 'number'">
      <CusNumberIput
        :key="props.key"
        v-model="value"
        @change="emits('update:modelValue', value)"
        :config="(props.config as CusNumer)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { CusNumer, LabelValue, Slider } from '@/core/props-type';
import { PropsFieldType } from '@/core/props-type';
import CusRadioButton from './CustomForm/radio-button.vue'
import CusSlider from './CustomForm/slider.vue'
import CusColorPicker from './CustomForm/color-picker.vue'
import CusUploader from './CustomForm/uploader.vue'
import CusNumberIput from './CustomForm/number-input.vue'
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
