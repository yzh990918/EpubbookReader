<template>
  <div>
    <transition name="slideUp">
      <div class="setting-wrapper" v-show="menuVisable && selectedNum === 2">
        <div class="setting-theme">
          <div
            class="setting-theme-item"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(item.name)"
          >
            <div
              class="preview"
              :style="{ background: item.style.body.background }"
              :class="{ selected: item.name === defaultTheme }"
            ></div>
            <div class="text" :class="{ selected: item.name === defaultTheme }">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { themeList, addLink, removeAllCss } from "../../mixin/book";
import { bookmixin } from "../../mixin/index";
import { saveTheme } from "../../mixin/storage";
export default {
  mixins: [bookmixin],
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},
  created() {},

  computed: {
    themeList() {
      let themelist = themeList();
      return themelist;
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    // todo: 1.全局注册主题 2. initstyle里面添加缓存逻辑 3.mixin里添加全局switchtheme 之前要remove全部的link文件 4。将方法注入settheme中
    setTheme(theme) {
      this.settheme(theme);
      this.CurrentBook.rendition.themes.select(theme);
      saveTheme(this.fileName, theme);
      this.initGlobaltheme();
    },
    initGlobaltheme() {
      removeAllCss();
      switch (this.defaultTheme) {
        case "Default":
          addLink(`http://106.15.231.180/theme/theme_default.css`);
          break;
        case "Eye":
          addLink(`http://106.15.231.180/theme/theme_eye.css`);
          break;
        case "Gold":
          addLink(`http://106.15.231.180/theme/theme_gold.css`);
          break;
        case "Night":
          addLink(`http://106.15.231.180/theme/theme_night.css`);
          break;
        default:
          this.saveTheme(this.defaultTheme);
          addLink(`http://106.15.231.180/theme/theme_default.css`);
          break;
      }
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/global'
.setting-wrapper
   position: absolute;
   left: 0;
   z-index: 201;
   width: 100%;
   margin-top -4.4rem
   height: 2.4rem;
   background:  #F5EACC;
   box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
   &.slideUp-enter,&.slideUp-leave-active
    transform translate3d(0,100%,0)
    opacity 0
  &.slideUp-enter-active,&.slideUp-leave-active
    opacity 1
    transition all .2s linear
  .setting-theme
    height: 100%;
    width 100%
    display: flex;
    .setting-theme-item
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        border: none;
        &.selected
          box-shadow 0 4px 5px rgba(0,0,0,0.1)
          border 2px solid #5e6369
      .text
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #ccc;
        center()
        &.selected
          color: #333;
</style>
