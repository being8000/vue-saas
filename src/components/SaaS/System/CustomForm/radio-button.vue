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
  key: string,
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

  &>:nth-child(1) {
    border-radius: 5px 0px 0px 5px;
    overflow: hidden;
  }

  &>:nth-last-child(1) {
    border-radius: 0px 5px 5px 0px;
    border-right-width: 1px;
    overflow: hidden;
  }

  &>label {
    border: 1px solid var(--primary-color);
    padding: 2px 5px;
    border-right-width: 0px;
    cursor: pointer;



    &>input {
      display: none;
    }

    &:has(:checked) {
      background-color: var(--primary-color);
      color: #ffffff;
    }
  }
}
</style>
