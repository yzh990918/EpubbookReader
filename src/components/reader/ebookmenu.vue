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
  </div>
</template>

<script>
import { bookmixin } from "../../mixin/index";
import settingFont from "../reader/ebooksetFont";
import settingBg from "../reader/ebooksetBg";
import settingProgress from "../reader/ebooksetPg";
export default {
  mixins: [bookmixin],
  name: "",
  props: {
    flag: Boolean
  },
  data() {
    return {
      menuFlag: false
    };
  },

  components: { settingFont, settingBg, settingProgress },
  created() {},

  computed: {
    // todo:1.控制面板的显示与隐藏 2.设置显示字号设置时面板阴影消失 3.点击隐藏时设置num为-1  4.混入minx使用vuex 5.this.book写入vuex中 6.填写fontsize数组 ,实现字号更换功能，默认字体大小写入vuex 7 .更改vuex默认字号 8.添加设置字体的wrapper 占三分之一份,定义vuex字体值 8。定义弹出层 书写样式 添加动画 9.添加点击事件 更改字体，翻页时隐藏面板
    // (this.currentBook.rendition.themes.fontSize() this.currnetBook.rendition.themes.font())
    // 更换字体时需要使用钩子函数
    // todo: 书写样式代码 定义themList方法返回them数组 1.定义vuex theme 点击事件设置当前vuex theme 删除border 和设置item.name匹配选中项
    // 注册 initTheme(){this.themelist.forEach((theme)=>{this.rendition.themes.register(theme.name,theme.style)})}
    // 设置默认样式 this.rendition.themes.select(defaulttheme)
    // 设置主题方法: 点击事件异步调用select() 选中时preview设置一个阴影  保存storage 全局引如css文件到head 动态主题切换（switch case 实现） 点击事件设置全局主题  书写清除css文件方法
    // todo:  总结:1.完成了电子书的翻页(通过监听touchstart touchend事件) 2.完成了电子书面板样式代码和基本逻辑 3.完成了电子书的字号 字体设置 这里主要使用到了this.rendition的方法 4.主题更改 5.进度更改 6.目录显示与跳转 8.书签 9.完善 缓存处理
  },

  beforeMount() {},

  mounted() {},

  methods: {
    showSetting(key) {
      this.setSelectNum(key);
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
