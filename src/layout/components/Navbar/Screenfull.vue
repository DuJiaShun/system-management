<template>
  <div class="screenfull" @click="toggle">
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Screenfull' })
const { isFullscreen, toggle } = useFullscreen()
// 改写F11全屏
window.onkeydown = function (event) {
  if (event.code === 'F11') {
    event.preventDefault()
    toggle()
  }
}
</script>

<style lang="scss" scoped>
.screenfull .svg-icon {
  fill: #5a5e66;
  width: 20px;
  height: 20px;
}
</style>
