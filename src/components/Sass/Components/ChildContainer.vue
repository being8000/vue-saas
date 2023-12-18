<template>
  <div class="child-container">
    <slot>
      child-container
    </slot>
  </div>
</template>
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.child-container {
  min-width: 100%;
  text-align: center;
  background-color: rgb(159, 122, 245);
}
</style>