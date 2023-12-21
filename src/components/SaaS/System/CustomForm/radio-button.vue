<template>
  <section class="radio">
    <label
      class="button"
      @change="onChange"
      v-for="(item, index) in config"
      :key="index"
    >
      <input
        v-model="value"
        type="radio"
        :value="item.value"
        :name="props.key"
      >
      {{ item.label }}
    </label>
  </section>
</template>

<script lang="ts" setup>
import { LabelValue } from '@/core/props-type';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: any,
  config: LabelValue[],
  key: string | undefined,
}>()
const emits = defineEmits(['update:modelValue', "change"])
const value = ref(props.modelValue)
const onChange = () => {
  emits('update:modelValue', value)
  emits('change', value)
}
</script>

<style lang="scss" scoped>
.radio {


  &>:nth-last-child(1) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &>:nth-child(1) {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  // &>:has(label+label) {
  //   background-color: red;
  // }

  &>label {
    border: 1px solid var(--primary-color);
    padding: 4px 5px;
    cursor: pointer;
    font-size: 12px;



    &>input {
      display: none;
    }

    &:has(:checked) {
      background-color: var(--primary-color);
      color: #ffffff;
    }
  }

  label+label {
    border-left: 0;
  }
}
</style>
