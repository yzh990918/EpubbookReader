<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// 引入rem自适应 代销为当前屏幕宽度/10 不能超过50
document.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector("html");
  let fontsize = window.innerWidth / 10;
  fontsize = fontsize > 50 ? 50 : fontsize;
  html.style.fontSize = fontsize + "px";
});
export default {};
</script>

<style lang="stylus">

#app
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 0
  background #F5EACC
</style>
