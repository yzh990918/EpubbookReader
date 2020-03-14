<template>
  <div>
    <transition name="slideUp">
      <div class="setting-wrapper" v-show="menuVisable && selectedNum === 1">
        <div class="setting-theme">
          <div class="read-time">
            <span style="margin-top:10px;">阅读时间:3小时</span>
          </div>
          <div class="slide-wrapper">
            <div class="text"><span>上一章</span></div>
            <div class="wrapper">
              <Slider
                bar-height="4px"
                active-color="#5f5f56"
                button-size="15"
                v-model="value"
                inactive-color="#d4d4cf"
                @change="onChange"
              ></Slider>
            </div>

            <div class="text"><span>下一章</span></div>
          </div>
          <div class="book-progress">
            <span>第一章 废材的逆袭({{ precent }}%)</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Slider } from "vant";
import { bookmixin } from "../../mixin/index";
export default {
  mixins: [bookmixin],
  name: "",
  props: [""],
  data() {
    return {
      value: 0,
      precent: 0
    };
  },

  components: { Slider },
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    onChange(value) {
      // 拿到value/100 百分比，然后通过CfiFromPrecentage(precent)获取当前的内容
      const cfi = this.CurrentBook.locations.cfiFromPercentage(value / 100);
      this.CurrentBook.rendition.display(cfi);
      this.precent = value;
    }
    // todo: 阅读器章节读取 上一章下一章 阅读时间 目录 选择目录 目录信息等
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
   margin-top -4.8rem
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
    display flex
    width 100%
    flex-direction column
    .read-time
      font-size 16px
      display flex
      justify-content center
      align-items center
      color #5f5f56
      height 30px
      line-height 16px
    .slide-wrapper
      display flex
      height 40px
      .text
        font-size 11px
        flex 0 0 15%
        color #5f5f56
        display flex
        justify-content center
        align-items center
      .wrapper
        width 70%
        flex 1
        center()
    .book-progress
      color #5f5f56
      height 30%
      font-size 13px
      line-height 18px
      display flex
      justify-content center
      align-content center
</style>
<style>
.van-slider__button {
  background: #5f5f56;
}
</style>
