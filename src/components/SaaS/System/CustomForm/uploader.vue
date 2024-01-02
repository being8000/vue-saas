<template>
  <div class="uploader-container">
    <label>
      <input
        @change="onChange"
        type="file"
        :accept="config?.accept || 'image/*'"
        :multiple="config?.multiple || false"
      >
      请选择
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ImageConfig } from '@/core/props-type';
// import { shallowRef, ref } from 'vue';
withDefaults(defineProps<{
  modelValue: any,
  config: ImageConfig
}>(), {
  config: () => {
    return {
      accept: '*',
      multiple: false,
    }
  }
})
const emits = defineEmits(['update:modelValue', "change"])
// const file = shallowRef(props.modelValue)
const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const curFiles = input.files || [];
  if (curFiles.length === 0) {
    console.log("无图片")
  } else {
    const file = curFiles[0]
    const blobSrc = URL.createObjectURL(file);
    emits('update:modelValue', blobSrc)
    emits('change', blobSrc)
  }
}
</script>

<style lang="scss" scoped>
.uploader-container {
  display: flex;
  align-items: center;

  &>label {
    cursor: pointer;
    background-color: #f87171;
    color: #ffffff;
    padding: 3px 5px;
    font-size: 12px;
    border-radius: 3px;
    min-width: 50px;
    text-align: center;

    input {
      display: none;
    }

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
