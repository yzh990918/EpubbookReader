<template>
  <div class="book-menu">
    <transition name="slideUp">
      <div
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': !menuVisable || selectedNum >= 0 }"
        v-show="menuVisable"
      >
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(0)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a" @click="showSetting(3)">A</span>
        </div>
      </div>
    </transition>
    <settingFont></settingFont>
    <settingBg></settingBg>
    <settingProgress></settingProgress>
    <Popup closeable :class="backgroundStyle" v-model="show" position="left">
      <div class="top">
        <div class="left">
          <img :src="cover" width="60px" height="80px" />
        </div>
        <div class="right">
          <div class="filename">
            {{ metadata ? metadata.title : "好书" }}
          </div>
          <div class="read-info">
            <span>已读{{ progress * 100 }}% </span>

            <span> ,您已经读了{{ Math.ceil(time / 60) }}分钟</span>
          </div>
        </div>
      </div>
      <div class="content">
        <scroll
          class="slide-contents-list"
          :top="186"
          :bottom="10"
          ref="scroll"
        >
          <div
            class="slide-contents-item"
            v-for="(item, index) in navigation"
            :key="index"
            @click="display(item.href)"
          >
            <span
              class="slide-contents-item-label"
              :class="{ selected: section === index }"
              :style="navCls(item)"
              >{{ item.label.trim() }}</span
            >
          </div>
        </scroll>
      </div>
    </Popup>
  </div>
</template>

<script>
import { bookmixin } from "../../mixin/index";
import settingFont from "../reader/ebooksetFont";
import settingBg from "../reader/ebooksetBg";
import settingProgress from "../reader/ebooksetPg";
import { getProgress, saveLocation, saveProgress } from "../../mixin/storage";
import { Popup } from "vant";
import scroll from "./scroll";
export default {
  mixins: [bookmixin],
  name: "",
  props: {
    flag: Boolean
  },
  data() {
    return {
      menuFlag: false,
      show: false
    };
  },

  components: { settingFont, settingBg, settingProgress, Popup, scroll },
  created() {},

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
    },
    progressValue() {
      return getProgress(this.fileName);
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    showSetting(key) {
      this.setSelectNum(key);
      if (key === 0) {
        this.show = true;
      }
    },
    display(item) {
      this.CurrentBook.rendition.display(item);
      // 获取当前位置对象
      const Currentlocation = this.CurrentBook.rendition.currentLocation();
      // 保存当前的选中的章节号
      if (Currentlocation && Currentlocation.start.index) {
        this.setsection(Currentlocation.start.index);
      }
      const progress = this.CurrentBook.locations.percentageFromCfi(
        Currentlocation.start.cfi
      );
      // 保存阅读进度  应该精确到页的内容
      const location = Currentlocation.start.cfi;
      saveLocation(this.fileName, location);
      saveProgress(this.fileName, parseInt(progress * 100));
    },
    // 多级目录分级
    navCls(item) {
      return {
        marginLeft: `${item.level * 20}px`
      };
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/global.styl'
.menu-wrapper
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  max-height 1.8rem
  margin-top -1.8rem
  display: flex;
  width: 100%;
  height: 1.8rem;
  background: #F5EACC;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15)
  &.slideUp-enter,&.slideUp-leave-active
    transform translate3d(0,100%,0)
    opacity 0
  &.slideUp-enter-active,&.slideUp-leave-active
    transition all .2s
    opacity 1
  &.hide-box-shadow
    box-shadow: none;
  .icon-wrapper
    flex: 1;
    height 1.8rem
    center();
    .icon-progress
      font-size: 0.6rem;
    .icon-bright
      font-size: 0.6rem;
    .icon-menu
      font-size  0.6rem
    .icon-a
        font-size 0.5rem
>>> .van-popup
      width: 85%
      height: 100%
      &.default
        background #F5EACC
      &.gold
        background #c6c2b6
      &.night
        background #000000
      &.eye
        background #a9c1a9
</style>
<style lang="stylus" scoped>
.top
  display flex
  position relative
  top 30px
  padding 0 20px 15px 10px
  border-bottom 1px solid #b8b9bb
  .left
    display inline-block
    vertical-align middle
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    height 60px
    height 80px
    flex 0 0 60px
  .right
    display flex
    flex 1
    flex-direction column
    justify-content center
    margin-left 10px
    .filename
      font-size 16px
      font-weight 500
      max-width 80%
      line-height 20px
      margin-bottom 9px
      color #4C5059
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .read-info
      color #666
      font-size 13px
      line-height 16px
.content
  .slide-contents-list
    padding: 0 15px;
    box-sizing: border-box;
    .slide-contents-item
      display: flex;
      padding: 20px 0;
      box-sizing: border-box;
      .slide-contents-item-label
        flex: 1;
        font-size: 14px;
        line-height: 16px;
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
<style scoped>
.scroll-wrapper,
.slide-contents-list {
  height: 650px !important;
  margin-top: 30px !important;
}
</style>
