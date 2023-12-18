<template>
  <div class="root">
    <slot>
      root-container
    </slot>
  </div>
</template>
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.root {
  min-width: 100%;
  text-align: center;
  background-color: rgb(153, 240, 255);
  min-height: 100vh;
}
</style>