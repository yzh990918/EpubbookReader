<template>
  <div>
    <transition name="slideUp">
      <div class="setting-wrapper" v-show="menuVisable && selectedNum === 1">
        <div class="setting-theme">
          <div class="read-time">
            <span style="margin-top:10px;">书籍是人类进步的阶梯</span>
          </div>
          <div class="slide-wrapper">
            <div class="text" @click="prevePage()"><span>上一章</span></div>
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

            <div class="text" @click="nextPage()"><span>下一章</span></div>
          </div>
          <div class="book-progress">
            <span>{{ sectionText }}({{ value }}%)</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Slider } from "vant";
import { bookmixin } from "../../mixin/index";
import { saveLocation, saveProgress, getProgress } from "../../mixin/storage";
export default {
  mixins: [bookmixin],
  name: "",
  props: [""],
  data() {
    return {
      precent: 0,
      value: 0
    };
  },

  components: { Slider },
  created() {},

  computed: {
    sectionText() {
      if (this.section) {
        let sectionInfo = this.CurrentBook.section(this.section);
        if (
          sectionInfo &&
          sectionInfo.href &&
          this.CurrentBook &&
          this.CurrentBook.navigation
        ) {
          return this.CurrentBook.navigation.get(sectionInfo.href).label;
        }
      }

      return this.fileName;
    }
  },

  beforeMount() {},

  mounted() {
    this.value = getProgress(this.fileName);
  },

  methods: {
    onChange(value) {
      // 拿到value/100 百分比，然后通过CfiFromPrecentage(precent)获取当前的内容
      const cfi = this.CurrentBook.locations.cfiFromPercentage(value / 100);
      this.CurrentBook.rendition.display(cfi);
      // 保存进度给progress
      saveProgress(this.fileName, value);
      saveLocation(this.fileName, cfi);
      let currentsection = this.CurrentBook.rendition.currentLocation();
      console.log(currentsection);

      // 获取当前章节数
      this.setsection(currentsection.start.index);
    },
    // todo: 阅读器章节读取 上一章下一章 阅读时间 目录 选择目录 目录信息等
    prevePage() {
      if (this.bookAvailable && this.section > 0) {
        console.log("click");
        let section = this.section - 1;
        this.setsection(section);

        // 拿到章节信息 里面的href就是跳转的内容 显示章节内容
        const sectionInfo = this.CurrentBook.section(section);
        if (section && sectionInfo.href) {
          this.CurrentBook.rendition.display(sectionInfo.href).then(() => {
            this.refreshSection();
          });
        }
      }
    },
    nextPage() {
      if (
        this.bookAvailable &&
        this.section < this.CurrentBook.spine.length - 1
      ) {
        console.log("click");
        let section = this.section + 1;
        this.setsection(section);
        const sectionInfo = this.CurrentBook.section(section);
        if (section && sectionInfo.href) {
          this.CurrentBook.rendition.display(sectionInfo.href).then(() => {
            this.refreshSection();
          });
        }
      }
    },
    refreshSection() {
      // 获取到当前进度的位置信息 通过rendition.currentLoaction获取
      const Currentlocation = this.CurrentBook.rendition.currentLocation();
      // console.log(Currentlocation);
      // 根据 cfi获取进度百分比
      const progress = this.CurrentBook.locations.percentageFromCfi(
        Currentlocation.start.cfi
      );
      this.value = parseInt(progress * 100);
      // 保存阅读进度  应该精确到页的内容
      const location = Currentlocation.start.cfi;
      saveLocation(this.fileName, location);
      saveProgress(this.fileName, parseInt(progress * 100));
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
      span
        overflow hidden
        display inline-block
        max-width 80%
        text-overflow ellipsis
        white-space nowrap
</style>
<style>
.van-slider__button {
  background: #5f5f56;
}
</style>
