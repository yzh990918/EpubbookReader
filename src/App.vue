<template>
  <div id="app" :class="backgroundStyle">
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
import { bookmixin } from "./mixin/index";
export default {
  mixins: [bookmixin],
  computed: {
    backgroundStyle() {
      if (this.defaultTheme === "Default") {
        return "default";
      } else if (this.defaultTheme === "Gold") {
        return "gold";
      } else if (this.defaultTheme === "Eye") {
        return "eye";
      } else {
        return "night";
      }
    }
  }
};
</script>

<style lang="stylus">

#app
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 0
  &.default
    background #F5EACC
  &.gold
    background #c6c2b6
  &.night
    background #000000
  &.eye
    background #a9c1a9
</style>
