<template>
  <!-- 手机本体 -->
  <div class="iPhone-14-pro">
    <!-- 手机屏幕 -->
    <div class="screen">
      <div class="wrapper">
        <!-- 灵动岛 -->
        <div class="dynamic-island"></div>
        <div
          style="transform:translateX(-1px)"
          class="inter-screen"
        >
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
</script>
<style lang="scss" scoped>
/* 手机本体 */
.iPhone-14-pro {
  position: relative;
  width: 375px;
  height: 667px;
  background-color: #998c9e;
  border-radius: 10px;

}

.inter-screen {
  height: 100%;

}

/* 手机屏幕 */
.iPhone-14-pro .screen {
  position: absolute;
  inset: 2px;
  background-color: rgb(189, 189, 189);
  border-radius: 10px;
  /* 边框 */
  padding: 10px;
}

/* 屏幕内容 */
.iPhone-14-pro .screen .wrapper {
  width: 100%;
  height: 100%;
  padding-left: 3px;
  padding-right: 2px;
  padding-top: 2px;
  background-color: #fff;
  // background: url(https://cdn.ytechb.com/wp-content/uploads/2022/09/iPhone-14-Pro-Wallpaper-purple.webp);
  background-size: cover;
  overflow-x: hidden;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>