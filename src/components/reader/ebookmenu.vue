<template>
  <div class="book-menu">
    <transition name="slideUp">
      <div
        class="menu-wrapper"
        :class="{ 'hide-box-shadow': false }"
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import settingFont from "../reader/ebooksetFont";
export default {
  name: "",
  props: {
    flag: Boolean
  },
  data() {
    return {
      menuFlag: false
    };
  },

  components: { settingFont },
  created() {},

  computed: {
    ...mapGetters(["menuVisable", "settingMenu"]),
    ...mapMutations({
      setmenuNum: "SET_MENUNUM"
    })
    // todo:1.控制面板的显示与隐藏 2.设置显示字号设置时面板阴影消失 3.点击隐藏时设置num为-1  4.混入minx使用vuex 5.this.book写入vuex中 6.填写fontsize数组 ,实现字号更换功能，默认字体大小写入vuex 7 .更改vuex默认字号 8.添加设置字体的wrapper 占三分之一份,定义vuex字体值 8。定义弹出层 书写样式 添加动画 9.添加点击事件 更改字体，翻页时隐藏面板

    // (this.currentBook.redition.themes.fontSize() this.currnetBook.redition.themes.font())

    // 更换字体时需要使用钩子函数
  },

  beforeMount() {},

  mounted() {},

  methods: {
    showSetting(key) {
      console.log(this.settingMenu);
      this.setmenuNum(key);
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
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
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
</style>
